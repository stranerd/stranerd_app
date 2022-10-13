/* eslint-disable no-console */
const { execSync, exec } = require('child_process')
const { parse } = require('plist')
const { readFileSync } = require('fs')

const installCertAndProfile = (profileFile, certificateFile) => {
	const keychain = 'login.keychain'

	const rawPlist = readFileSync(profileFile).toString()
	const startIndex = rawPlist.indexOf('<?xml')
	const endString = '</plist>'
	const endIndex = rawPlist.indexOf(endString)
	const data = parse(rawPlist.slice(startIndex, endIndex + endString.length))
	const { UUID } = data
	const command = `
cp -fr "${ profileFile }" "$HOME/Library/MobileDevice/Provisioning Profiles/${ UUID }.mobileprovision" &&
security unlock-keychain ${ keychain } && security set-keychain-settings ${ keychain } &&
security import ${ certificateFile } -k ${ keychain } -T /usr/bin/codesign &&
security set-key-partition-list -S apple-tool:,apple:,codesign: -s ${ keychain }
`
	execSync(command, { maxBuffer: 1024 * 1024 * 5 })

	return data
}

const appBuild = async (args) => {
	const validPlatforms = ['android', 'ios']
	const platform = args[0]

	if (!validPlatforms.includes(platform)) {
		console.log(`Invalid platform. Supported values: ${ validPlatforms.join(', ') }`)
		process.exit(1)
	}

	const validConfigurations = ['Release', 'Debug']
	const configuration = args[1] ?? validConfigurations[0]

	if (!validConfigurations.includes(configuration)) {
		console.log(`Invalid configuration. Supported values: ${ validConfigurations.join(', ') }`)
		process.exit(1)
	}

	const android = () => {
		const validTypes = ['assemble', 'bundle']
		const type = args[2] ?? validTypes[0]

		if (!validTypes.includes(type)) {
			console.log(`Invalid type. Supported values: ${ validTypes.join(', ') }`)
			process.exit(1)
		}

		const isAssemble = type === validTypes[0]
		const isBundle = type === validTypes[1]

		const sign = 'apksigner sign --ks ./stranerd.keystore --ks-key-alias kevin@stranerd.com'
		const signAssemble = `zipalign 4 ./app/build/outputs/apk/release/app-release-unsigned.apk ./app/build/outputs/apk/release/app-release.apk && ${ sign } ./app/build/outputs/apk/release/app-release.apk`
		const signBundle = `${ sign } --min-sdk-version 22 ./app/build/outputs/bundle/release/app-release.aab`

		const install = args.includes('--install') ? `./gradlew install${ configuration } &&` : ''

		return `cd android && rm -rf app/build &&
./gradlew ${ type + configuration } && ${ install }
${ isAssemble ? signAssemble : '' }${ isBundle ? signBundle : '' }
`
	}

	const ios = () => {
		const archiveFile = 'Archive/App'
		const ipaFile = 'Output'
		const exportPlistFile = 'App/Export.plist'

		return `cd ios/App && rm -rf ${ ipaFile } &&
xcodebuild -workspace App.xcworkspace -scheme App clean archive -archivePath ${ archiveFile } -configuration ${ configuration } &&
xcodebuild -exportArchive -archivePath ${ archiveFile }.xcarchive -exportOptionsPlist ${ exportPlistFile } -exportPath ${ ipaFile }
`
	}

	const platforms = {
		android, ios,
		default: () => 'echo Invalid platform provided'
	}

	const runner = platforms[platform] ?? platforms.default
	const proc = exec(runner(), { maxBuffer: 1024 * 1024 * 5 })
	proc.stdout.pipe(process.stdout)
	proc.stderr.pipe(process.stderr)
	process.stdin.pipe(proc.stdin)
}

module.exports = { appBuild, installCertAndProfile }
