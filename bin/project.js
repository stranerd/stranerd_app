const { MobileProject } = require('@trapezedev/project')
const fs = require('fs')
const envs = require('../env.json')
const { asset_links, google_client_ids, package_name, app_name, environment, domain } = envs

const getProject = async () => {
	const project = new MobileProject('./', {
		ios: { path: 'ios/App' },
		android: { path: 'android' }
	})
	await project.load()
	return project
}

const setup = async () => {
	const folder = './public/.well-known'
	if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
	fs.writeFileSync(`${ folder }/assetlinks.json`, JSON.stringify(asset_links.android ?? {}, null, 4))
	fs.writeFileSync(`${ folder }/apple-app-site-association`, JSON.stringify(asset_links.ios ?? {}, null, 4))

	const reversedIosClientId = google_client_ids.ios.split('.').reverse().join('.')

	const project = await getProject()

	const versionCode = 1
	const versionName = '0.0.0'

	const targets = project.ios.getTargets()
	await Promise.all(targets.map(async (target) => {
		await Promise.all(target.buildConfigurations.map(async (build) => {
			await project.ios.setBundleId(target.name, build.name, package_name)
			await project.ios.setDisplayName(target.name, build.name, app_name)
			await project.ios.setVersion(target.name, build.name, versionName)
			await project.ios.setBuild(target.name, build.name, versionCode)
			await project.ios.setBuildProperty(target.name, build.name, 'GOOGLE_CLIENT_ID', reversedIosClientId)
			await project.ios.setBuildProperty(target.name, build.name, 'DOMAIN', domain)
			await project.ios.addEntitlements(target.name, build.name, {
				'aps-environment': environment,
				'com.apple.developer.associated-domains': [`applinks:${ domain }`]
			})
		}))
	}))

	await project.android.setPackageName(package_name)
	await project.android.setVersionName(versionName)
	await project.android.setVersionCode(versionCode)

	await project.commit()

	const ANDROID_SOURCE = './android/app/google-services.json'
	const IOS_SOURCE = './ios/App/App/GoogleService-Info.plist'

	const ANDROID_CONFIG = `./bin/config/${ environment }/google-services.json`
	const IOS_CONFIG = `./bin/config/${ environment }/GoogleService-Info.plist`

	const args = process.argv.slice(3)
	if (args.includes('--skip-apps')) return

	if (fs.existsSync(ANDROID_CONFIG)) fs.createReadStream(ANDROID_CONFIG).pipe(fs.createWriteStream(ANDROID_SOURCE))
	else return console.log('Provide a google-services.json file for your current environment')
	if (fs.existsSync(IOS_CONFIG)) fs.createReadStream(IOS_CONFIG).pipe(fs.createWriteStream(IOS_SOURCE))
	else return console.log('Provide a GoogleService-Info.plist file for your current environment')
}

const version = async () => {
	const firstVersionDate = 1640995200000
	const versionCode = Math.floor((Date.now() - firstVersionDate) / 1e5)
	const versionName = process.argv[3].toString()
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

const type = process.argv[2]

if (type === 'setup') setup().then()
else if (type === 'version') version().then()
else if (type === 'env') env().then()
