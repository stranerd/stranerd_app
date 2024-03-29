/* eslint-disable no-console */
const { execSync } = require('child_process')
const version = process.env.APP_VERSION

if (!version) {
	console.log('No version provided')
	process.exit(1)
}

const details = version
	.split('v')
	.at(-1)
	.replace(')', '')
	.split('(')

const command = `yarn bin:project:version ${details.join(' ')}`

console.log(
	execSync(command, { maxBuffer: 1024 * 1024 * 5 }).toString()
)