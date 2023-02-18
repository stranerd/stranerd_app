/* eslint-disable no-console */
const { execSync, exec } = require('child_process')
const { parse } = require('plist')
const { readFileSync } = require('fs')
const { ios: iosEnv, android: androidEnv } = require('../env.json')

const installCertAndProfile = (profileFile, certificateFile) => {
	const keychain = 'appsigning.keychain-db'
	const kcp = iosEnv.keychain_password
	const cp = iosEnv.certificate_password

	const rawPlist = readFileSync(profileFile).toString()
	const startIndex = rawPlist.indexOf('<?xml')
	const endString = '</plist>'
	const endIndex = rawPlist.indexOf(endString)
	const data = parse(rawPlist.slice(startIndex, endIndex + endString.length))
	const { UUID } = data
	const profilePath = '$HOME/Library/MobileDevice/Provisioning Profiles'
	const command = `mkdir -p "${profilePath}" &&
cp -fr "${profileFile}" "${profilePath}/${UUID}.mobileprovision" &&
rm -f "$HOME/Library/Keychains/${keychain}" &&
security create-keychain -p ${kcp} ${keychain} &&
security set-keychain-settings -lut 21600 ${keychain} &&
security unlock-keychain -p ${kcp} ${keychain} &&
security import ${certificateFile} -k ${keychain} -P ${cp} -A -t cert -f pkcs12 -T /usr/bin/codesign &&
security set-key-partition-list -k ${kcp} -S apple-tool:,apple:,codesign: -s ${keychain}
`
	execSync(command, { maxBuffer: 1024 * 1024 * 5 })

	const certificateCommand = `security find-identity -v -p codesigning ${keychain}`
	const certificateDetails = execSync(certificateCommand, { maxBuffer: 1024 * 1024 * 5 }).toString()
	const certificate = certificateDetails.split('"')[1]?.split(':')[0]

	return { data, certificate, keychain }
}

const appBuild = async (args) => {
	const validPlatforms = ['android', 'ios']
	const platform = args[0]

	if (!validPlatforms.includes(platform)) {
		console.log(`Invalid platform. Supported values: ${validPlatforms.join(', ')}`)
		process.exit(1)
	}

	const validConfigurations = ['Release', 'Debug']
	const configuration = args[1] ?? validConfigurations[0]

	if (!validConfigurations.includes(configuration)) {
		console.log(`Invalid configuration. Supported values: ${validConfigurations.join(', ')}`)
		process.exit(1)
	}

	const android = () => {
		const validTypes = ['assemble', 'bundle']
		const type = args[2] ?? validTypes[1]

		if (!validTypes.includes(type)) {
			console.log(`Invalid type. Supported values: ${validTypes.join(', ')}`)
			process.exit(1)
		}

		const ksp = androidEnv.keystore_password
		const ksa = androidEnv.keystore_alias

		const isAssemble = type === validTypes[0]
		const isBundle = type === validTypes[1]

		const sign = `apksigner sign --ks ./app.keystore --ks-pass pass:${ksp} --ks-key-alias ${ksa}`
		const signAssemble = `zipalign 4 ./app/build/outputs/apk/release/app-release-unsigned.apk ./app/build/outputs/apk/release/app-release.apk && ${sign} ./app/build/outputs/apk/release/app-release.apk`
		const signBundle = `${sign} --min-sdk-version 22 ./app/build/outputs/bundle/release/app-release.aab`

		const install = args.includes('--install') ? `./gradlew install${configuration} &&` : ''

		return `cd android && rm -rf app/build &&
./gradlew ${type + configuration} && ${install}
${isAssemble ? signAssemble : ''}${isBundle ? signBundle : ''}
`
	}

	const ios = () => {
		const archiveFile = 'Archive/App'
		const ipaFile = 'Output'
		const exportPlistFile = 'App/Export.plist'

		return `cd ios/App && rm -rf ${ipaFile} &&
xcodebuild -workspace App.xcworkspace -scheme App clean archive -archivePath ${archiveFile} -configuration ${configuration} &&
xcodebuild -exportArchive -archivePath ${archiveFile}.xcarchive -exportOptionsPlist ${exportPlistFile} -exportPath ${ipaFile}
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
