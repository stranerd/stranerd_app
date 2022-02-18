const { environment, google_client_ids } = require('../env.json')
const fs = require('fs')
const placeholder = 'replace_with_google_client_id'

const ANDROID_SOURCE = './android/app/google-services.json'
const IOS_SOURCE = './ios/app/GoogleService-Info.plist'

const ANDROID_CONFIG = `./bin/config/${environment}/google-services.json`
const IOS_CONFIG = `./bin/config/${environment}/GoogleService-Info.plist`

let type = process.argv[2]
type = ['set', 'reset'].includes(type) ? type : 'reset'

const iosInfoPlist = './ios/App/App/Info.plist'
const content = fs.readFileSync(iosInfoPlist).toString()
const iosClientId = google_client_ids.ios
const reversedIosClientId = iosClientId.split('.').reverse().join('.')
let replaced = ''

if (environment === 'reset') {
	if (fs.existsSync(ANDROID_SOURCE)) fs.unlinkSync(ANDROID_SOURCE)
	if (fs.existsSync(IOS_SOURCE)) fs.unlinkSync(IOS_SOURCE)
	replaced = content.replaceAll(reversedIosClientId, placeholder)
} else {
	if (fs.existsSync(ANDROID_CONFIG)) fs.createReadStream(ANDROID_CONFIG).pipe(fs.createWriteStream(ANDROID_SOURCE))
	if (fs.existsSync(IOS_CONFIG)) fs.createReadStream(IOS_CONFIG).pipe(fs.createWriteStream(IOS_SOURCE))
	replaced = content.replaceAll(placeholder, reversedIosClientId)
}

fs.writeFileSync(iosInfoPlist, replaced)