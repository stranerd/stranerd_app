/* eslint-disable no-console */
const { MobileProject } = require('@trapezedev/project')
const fs = require('fs')
const { build } = require('plist')
const {
	appBuild, installCertAndProfile,
	authenticationKeyPath, exportPlistPath
} = require('./app.js')
const envs = require('../env.json')
const { v } = require('valleyed')
const { asset_links, google_client_ids, package_name, app_name, environment, domain } = envs
const isProduction = environment === 'production'

const getProject = async () => {
	process.env.VERBOSE = 'false'
	const project = new MobileProject('./', {
		ios: { path: 'ios/App' },
		android: { path: 'android' }
	})
	await project.load()
	return project
}

const copyTo = (from, to, error) => {
	if (fs.existsSync(from)) fs.createReadStream(from).pipe(fs.createWriteStream(to))
	else return console.log(error)
}

const setup = async (args) => {
	const skipApps = args.includes('--skip-apps')
	const folder = './public/.well-known'
	if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
	fs.writeFileSync(`${folder}/assetlinks.json`, JSON.stringify(asset_links.android ?? {}, null, 4))
	fs.writeFileSync(`${folder}/apple-app-site-association`, JSON.stringify(asset_links.ios ?? {}, null, 4))

	if (skipApps) return
	const reversedIosClientId = google_client_ids.ios.split('.').reverse().join('.')

	const project = await getProject()

	const versionCode = 1
	const versionName = '0.0.0'

	const { data, certificate: identity, keychain } = installCertAndProfile(
		`./bin/config/${environment}/profile.mobileprovision`,
		`./bin/config/${environment}/certificate.p12`
	)
	const { Name, Entitlements, TeamIdentifier } = data
	const teamID = TeamIdentifier[0]
	await Promise.all(project.ios.getTargets().map(async (target) => {
		await Promise.all(target.buildConfigurations.map(async (build) => {
			await project.ios.setBundleId(target.name, build.name, package_name)
			await project.ios.setDisplayName(target.name, build.name, app_name)
			await project.ios.setVersion(target.name, build.name, versionName)
			await project.ios.setBuild(target.name, build.name, versionCode)
			await project.ios.setBuildProperty(target.name, build.name, 'GOOGLE_CLIENT_ID', reversedIosClientId)
			await project.ios.setBuildProperty(target.name, build.name, 'DOMAIN', domain)
			await project.ios.setBuildProperty(target.name, build.name, 'CODE_SIGN_STYLE', 'Manual')
			await project.ios.setBuildProperty(target.name, build.name, 'IPHONEOS_DEPLOYMENT_TARGET', '13.0')
			await project.ios.setBuildProperty(target.name, build.name, 'CODE_SIGN_IDENTITY', identity)
			await project.ios.setBuildProperty(target.name, build.name, 'CODE_SIGN_KEYCHAIN', keychain)
			await project.ios.setBuildProperty(target.name, build.name, 'PROVISIONING_PROFILE_SPECIFIER', Name)
			await project.ios.setBuildProperty(target.name, build.name, 'DEVELOPMENT_TEAM', teamID)
			await project.ios.setEntitlements(target.name, build.name, {
				...Entitlements,
				'com.apple.developer.applesignin': ['Default'],
				'com.apple.developer.associated-domains': [`applinks:${domain}`]
			})
		}))
	}))

	await project.android.setPackageName(package_name)
	await project.android.setVersionName(versionName)
	await project.android.setVersionCode(versionCode)

	await project.commit()

	const androidKeystorePath = 'android/app.keystore'
	const googleServicesPath = 'android/app/google-services.json'
	const googlePlistPath = 'ios/App/App/GoogleService-Info.plist'

	const androidKeystoreConfig = `bin/config/${environment}/app.keystore`
	const googleServicesConfig = `bin/config/${environment}/google-services.json`
	const googlePlistConfig = `bin/config/${environment}/GoogleService-Info.plist`
	const iosAuthKeyConfig = `bin/config/${environment}/auth.p8`

	fs.writeFileSync(exportPlistPath, build({
		destination: 'export',
		method: isProduction ? 'app-store' : 'development',
		provisioningProfiles: { [package_name]: Name },
		signingStyle: 'manual', teamID
	}))
	copyTo(androidKeystoreConfig, androidKeystorePath, 'Provide an app.keystore file for your current environment')
	copyTo(googleServicesConfig, googleServicesPath, 'Provide a google-services.json file for your current environment')
	copyTo(googlePlistConfig, googlePlistPath, 'Provide a GoogleService-Info.plist file for your current environment')
	copyTo(iosAuthKeyConfig, authenticationKeyPath, 'Provide an auth.p8 file for your current environment')
}

const version = async (args) => {
	const firstVersionDate = 1640995200000
	const providedVersionCode = parseInt(args[1])
	const versionCode = v.number().gt(0).parse(providedVersionCode).valid ?
		providedVersionCode : Math.floor((Date.now() - firstVersionDate) / 1e5)
	const versionName = args[0].toString()
	if (!versionName) {
		console.log('Provide a version please')
		return process.exit(1)
	}

	const project = await getProject()

	const targets = project.ios.getTargets()
	await Promise.all(targets.map(async (target) => {
		await Promise.all(target.buildConfigurations.map(async (build) => {
			await project.ios.setVersion(target.name, build.name, versionName)
			await project.ios.setBuild(target.name, build.name, versionCode)
		}))
	}))

	await project.android.setVersionName(versionName)
	await project.android.setVersionCode(versionCode)
	await project.commit()
	console.log(`Versioned to ${versionName}(${versionCode})`)
}

const env = async () => {
	const entries = Object.entries(envs).map(([key, value]) => ([key, typeof value === 'string' ? value : JSON.stringify(value)]))
	const envFormattedEntries = entries.reduce((accumulator, currentValue) => {
		const [key, value] = currentValue
		return accumulator + `VITE_${key.toUpperCase()}=${value}\n`
	}, '')
	fs.writeFileSync('.env', envFormattedEntries)
}

const actions = { setup, version, env, appBuild }

const run = actions[process.argv[2]] ?? (async () => console.log(`Invalid action provided. Valid actions are: ${Object.keys(actions).filter((x) => x !== 'default')}`))
run(process.argv.slice(3)).then()
