/* eslint-disable no-console */
const { MobileProject } = require('@trapezedev/project')
const fs = require('fs')
const { exec } = require('child_process')
const envs = require('../env.json')
const { asset_links, google_client_ids, package_name, app_name, environment, domain } = envs
const isProduction = environment === 'production'

const getProject = async () => {
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
	const folder = './public/.well-known'
	if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
	fs.writeFileSync(`${ folder }/assetlinks.json`, JSON.stringify(asset_links.android ?? {}, null, 4))
	fs.writeFileSync(`${ folder }/apple-app-site-association`, JSON.stringify(asset_links.ios ?? {}, null, 4))

	const reversedIosClientId = google_client_ids.ios.split('.').reverse().join('.')

	const project = await getProject()

	const versionCode = 1
	const versionName = '0.0.0'

	const iosTeamId = 'SK23HB744S'
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
			const identity = isProduction && build.name === 'Release' ? 'Apple Distribution' : 'Apple Development'
			await project.ios.setBuildProperty(target.name, build.name, 'CODE_SIGN_IDENTITY', identity)
			await project.ios.setBuildProperty(target.name, build.name, 'DEVELOPMENT_TEAM', iosTeamId)
			await project.ios.addEntitlements(target.name, build.name, {
				'com.apple.developer.associated-domains': [`applinks:${ domain }`]
			})
		}))
	}))

	await project.android.setPackageName(package_name)
	await project.android.setVersionName(versionName)
	await project.android.setVersionCode(versionCode)

	await project.commit()

	const googleServicesPath = './android/app/google-services.json'
	const googlePlistPath = './ios/App/App/GoogleService-Info.plist'
	const exportPlistPath = './ios/App/App/Export.plist'

	const googleServicesConfig = `./bin/config/${ environment }/google-services.json`
	const googlePlistConfig = `./bin/config/${ environment }/GoogleService-Info.plist`
	const exportPlistConfig = `./bin/config/${ environment }/Export.plist`

	if (args.includes('--skip-apps')) return

	copyTo(googleServicesConfig, googleServicesPath, 'Provide a google-services.json file for your current environment')
	copyTo(googlePlistConfig, googlePlistPath, 'Provide a GoogleService-Info.plist file for your current environment')
	copyTo(exportPlistConfig, exportPlistPath, 'Provide a Export.plist file for your current environment')
}

const version = async (args) => {
	const firstVersionDate = 1640995200000
	const versionCode = Math.floor((Date.now() - firstVersionDate) / 1e5)
	const versionName = args[0].toString()
	if (!versionName) return console.log('Provide a version please')

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
}

const env = async () => {
	const entries = Object.entries(envs).map(([key, value]) => ([key, typeof value === 'string' ? value : JSON.stringify(value)]))
	const envFormattedEntries = entries.reduce((accumulator, currentValue) => {
		const [key, value] = currentValue
		return accumulator + `VUE_APP_API_${ key.toUpperCase() }=${ value }\n`
	}, '')
	fs.writeFileSync('.env', envFormattedEntries)
}

// TODO: figure how to install provisioningFile
const appBuild = async (args) => {
	const platform = args[0]
	const configuration = args[1] ?? 'Release'
	const validConfigurations = ['Release', 'Debug']

	if (!validConfigurations.includes(configuration)) {
		console.log(`Invalid configuration. Supported values: ${validConfigurations.join(', ')}`)
		process.exit(1)
	}

	const ios = async () => {
		const archiveFile = 'Archive/App'
		const ipaFile = 'Output'
		const exportPlistFile = 'App/Export.plist'

		return `cd ios/App &&
xcodebuild archive -workspace App.xcworkspace -configuration ${configuration} -scheme App -archivePath ${archiveFile} &&
xcodebuild -exportArchive -archivePath ${archiveFile}.xcarchive -exportPath ${ipaFile} -exportOptionsPlist ${exportPlistFile}
`
	}

	const platforms = {
		ios,
		default: () => 'echo Invalid platform provided'
	}

	const runner = platforms[platform] ?? platforms.default
	exec(runner(), { maxBuffer: 1024 * 1024 * 5 }, (error, stdout, stderr) => {
		if (error) return console.log(error.message)
		if (stderr) return console.log(stderr)
		console.log(stdout)
	})
}

const actions = {
	setup, version, env, appBuild,
	default: async () => console.log('Invalid action provided')
}

const run = actions[process.argv[2]] ?? actions.default
run(process.argv.slice(3)).then()
