const { environment, google_client_id } = require('../env.json')
const fs = require('fs')

const ANDROID_SOURCE = './android/app/google-services.json'
const IOS_SOURCE = './ios/app/GoogleService-Info.plist'

const ANDROID_CONFIG = `./bin/config/${environment}/google-services.json`
const IOS_CONFIG = `./bin/config/${environment}/GoogleService-Info.plist`

const placeholder = 'replace_with_google_client_id'
const files = [
	'./android/app/src/main/res/values/strings.xml'
]

let type = process.argv[2]
type = ['set', 'reset'].includes(type) ? type : 'reset'

if (environment === 'reset') {
	if (fs.existsSync(ANDROID_SOURCE)) fs.unlinkSync(ANDROID_SOURCE)
	if (fs.existsSync(IOS_SOURCE)) fs.unlinkSync(IOS_SOURCE)
} else {
	if (fs.existsSync(ANDROID_CONFIG)) fs.createReadStream(ANDROID_CONFIG).pipe(fs.createWriteStream(ANDROID_SOURCE))
	if (fs.existsSync(IOS_CONFIG)) fs.createReadStream(IOS_CONFIG).pipe(fs.createWriteStream(IOS_SOURCE))
}

files.forEach((file) => {
	if (!fs.existsSync(file)) return
	const content = fs.readFileSync(file).toString()
	const replaced = type === 'reset' ?
		content.replaceAll(google_client_id, placeholder) :
		content.replaceAll(placeholder, google_client_id)
	fs.writeFileSync(file, replaced)
})
