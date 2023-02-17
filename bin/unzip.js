/* eslint-disable no-console */
const { execSync } = require('child_process')
const version = process.argv[2]
const { environment } = require('../env.json')

const content = process.env.BASE64_ZIPPED_CONTENT
const encodedFileName = 'encoded.txt'
const zippedFileName = 'comp.zip'

const command = `echo ${content} > ${encodedFileName} &&
base64 -d -i ${encodedFileName} -o ${zippedFileName} &&
rm ${encodedFileName} &&
unzip -o ${zippedFileName} -d ./bin/config/ &&
rm ${zippedFileName}`

console.log(execSync(command).toString())