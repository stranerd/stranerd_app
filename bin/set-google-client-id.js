const fs = require('fs')
const placeholder = 'replace_with_google_client_id'
const { google_client_id } = require('../env.json')

const files = [
	'./android/app/src/main/res/values/strings.xml',
	'./capacitor.config.json'
]

let type = process.argv[2]
type = ['set', 'reset'].includes(type) ? type : 'reset'

files.forEach((file) => {
	const content = fs.readFileSync(file).toString()
	const replaced = type === 'reset' ?
		content.replaceAll(google_client_id, placeholder) :
		content.replaceAll(placeholder, google_client_id)
	fs.writeFileSync(file, replaced)
})
