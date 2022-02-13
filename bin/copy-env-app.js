const fs = require('fs')
const envs = require('../env.json')

const entries = Object.entries(envs).map(([key, value]) => ([key, typeof value === 'string' ? value : JSON.stringify(value)]))
const envFormattedEntries = entries.reduce((accumulator, currentValue) => {
	const [key, value] = currentValue
	return accumulator + `VUE_APP_API_${key.toUpperCase()}=${value}\n`
}, '')
fs.writeFileSync('.env', envFormattedEntries)
