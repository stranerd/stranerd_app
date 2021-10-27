// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const envs = JSON.parse(content)
	const entries = Object.entries(envs).map(([key, value]) => ([key, typeof value === 'string' ? value : JSON.stringify(value)]))
	const envFormattedEntries = entries.reduce((accumulator, currentValue) => {
		const [key, value] = currentValue
		return accumulator + `VUE_APP_API_${key.toUpperCase()}=${value}\n`
	}, '')
	fs.writeFileSync('.env', envFormattedEntries)
} else throw new Error('Env.json doesnt exist. Try creating one by running npm env:copy:example')
