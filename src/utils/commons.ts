import { Clipboard } from '@capacitor/clipboard'
import { Share } from '@capacitor/share'
import { Notify } from '@utils/dialog'
import { isNumber } from '@stranerd/validate'
import { isWeb } from '@utils/constants'

export { extractTextFromHTML } from '@stranerd/validate'

enum Numbers {
	thousand = 10 ** 3,
	million = 10 ** 6,
	billion = 10 ** 9,
	trillion = 10 ** 12,
	quadrillion = 10 ** 15,
	quintillion = 10 ** 18,
}

export const catchDivideByZero = (num: number, den: number) => den === 0 ? 0 : num / den

export const formatNumber = (num: number, dp = 0) => {
	num = Math.abs(isNumber(num) ? num : 0)
	const zerosOfDp = '.' + new Array(dp).fill('0').map((x) => x).join('')
	if (num < Numbers.thousand) return num.toFixed(dp).replace(zerosOfDp, '')
	else if (num < Numbers.million) return (num / Numbers.thousand).toFixed(1).replace('.0', '') + 'k'
	else if (num < Numbers.billion) return (num / Numbers.million).toFixed(1).replace('.0', '') + 'm'
	else if (num < Numbers.trillion) return (num / Numbers.billion).toFixed(1).replace('.0', '') + 'b'
	else if (num < Numbers.quadrillion) return (num / Numbers.trillion).toFixed(1).replace('.0', '') + 'tr'
	else return num.toFixed(0)
}

export const pluralize = (count: number, singular: string, plural: string) => count === 1 ? singular : plural

export const getRandomValue = () => Date.now() + Math.random().toString(36).substr(2)

export const capitalize = (value: string) => value.trim().split(' ').map((c: string) => (c[0]?.toUpperCase() ?? '') + c.slice(1)).join(' ')

export function groupBy<Type, Unique extends string | number> (array: Array<Type>, func: (item: Type) => Unique) {
	const obj = array.reduce((acc, cur) => {
		const item = func(cur)
		acc[item] ||= []
		acc[item].push(cur)
		return acc
	}, {} as Record<Unique, Type[]>)
	return Object.entries(obj).map(([key, values]) => ({ key, values })) as { key: Unique, values: Type[] }[]
}

export const trimToLength = (body: string, length: number) => {
	if (body.length < length) return body
	return `${body.slice(0, length)}...`
}

export const copyToClipboard = async (text: string) => {
	await Clipboard.write({ string: text })
}

export function copyObject<T extends Record<any, any>> (target: T, ...sources: T[]) {
	return Object.assign(target, ...sources)
}

export const getAlphabet = (num: number) => 'abcdefghijklmnopqrstuv'.split('')[num - 1] ?? 'a'

export const share = async ({ title, text, url }: { title: string, text: string, url: string }) => {
	await Share.share({
		title, text, url, dialogTitle: title
	}).catch(async () => {
		await copyToClipboard(url)
		await Notify({
			title: 'Your device doesnt support the share api. The link has been copied to your clipboard instead'
		})
	})
}

export const getPercentage = (num: number, den: number) => catchDivideByZero(num, den) * 100

const localURL = 'http://localhost'
const ngrokURL = 'https://local.stranerd.eu.ngrok.io'

export const parseURL = (url: string) => !isWeb ? url.replace(localURL, ngrokURL) : url
export const unParseURL = (url: string) => !isWeb ? url.replace(ngrokURL, localURL) : url
