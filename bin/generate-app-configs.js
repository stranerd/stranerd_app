const { environment } = require('../env.json')
const fs = require('fs')

const ANDROID_SOURCE = './android/app/google-services.json'
const IOS_SOURCE = './ios/App/App/GoogleService-Info.plist'

const ANDROID_CONFIG = `./bin/config/${environment}/google-services.json`
const IOS_CONFIG = `./bin/config/${environment}/GoogleService-Info.plist`

let type = process.argv[2]
type = ['set', 'reset'].includes(type) ? type : 'reset'

if (environment === 'reset') {
	if (fs.existsSync(ANDROID_SOURCE)) fs.unlinkSync(ANDROID_SOURCE)
	if (fs.existsSync(IOS_SOURCE)) fs.unlinkSync(IOS_SOURCE)
} else {
	if (fs.existsSync(ANDROID_CONFIG)) fs.createReadStream(ANDROID_CONFIG).pipe(fs.createWriteStream(ANDROID_SOURCE))
	if (fs.existsSync(IOS_CONFIG)) fs.createReadStream(IOS_CONFIG).pipe(fs.createWriteStream(IOS_SOURCE))
}
