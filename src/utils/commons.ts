import { Clipboard } from '@capacitor/clipboard'
import { Share } from '@capacitor/share'
import { Notify } from '@utils/dialog'
import { isNumber } from '@stranerd/validate'
import { isWeb } from '@utils/constants'

export const catchDivideByZero = (num: number, den: number) => den === 0 ? 0 : num / den

export const formatNumber = (num: number, dp?: number) => Intl
	.NumberFormat('en', { notation: 'compact', ...(dp ? { maximumFractionDigits: dp } : {}) })
	.format(isNumber(num).valid ? Math.abs(num) : 0)

export const pluralize = (count: number, singular: string, plural: string) => Math.round(count) === 1 ? singular : plural

export const getRandomValue = () => Date.now() + Math.random().toString(36)

export const capitalize = (value: string) => value.trim().split(' ').map((c: string) => (c[0]?.toUpperCase() ?? '') + c.slice(1)).join(' ')

export const groupBy = <Type, Unique extends string | number> (array: Array<Type>, func: (item: Type) => Unique) => {
	return array.reduce((acc, cur) => {
		const key = func(cur)
		const index = acc.findIndex((a) => a.key === key)
		if (index === -1) acc.push({ key, values: [cur] })
		else acc[index].values.push(cur)
		return acc
	}, [] as { key: Unique, values: Type[] }[]) as { key: Unique, values: Type[] }[]
}

export const copyToClipboard = async (text: string) => {
	await Clipboard.write({ string: text })
}

export const copyObject = <T extends Record<any, any>> (target: T, ...sources: T[]) => Object.assign(target, ...sources)

export const getAlphabet = (num: number) => 'abcdefghijklmnopqrstuv'.split('')[num - 1] ?? 'a'

export const share = async ({ title, text, url }: { title: string, text: string, url: string }) => {
	if (await Share.canShare()) await Share.share({
		title, text, url, dialogTitle: title
	})
	else {
		await copyToClipboard(url)
		await Notify({
			message: 'Your device doesnt support the share api. The link has been copied to your clipboard instead'
		})
	}
}

export const getPercentage = (num: number, den: number) => catchDivideByZero(num, den) * 100

const localURL = 'http://localhost'
const ngrokURL = 'https://local.stranerd.eu.ngrok.io'

export const parseURL = (url: string) => url.replace(isWeb ? ngrokURL : localURL, isWeb ? localURL : ngrokURL)
export const unParseURL = (url: string) => !isWeb ? url.replace(ngrokURL, localURL) : url

export const addToArray = <T> (array: T[], item: T, getKey: (a: T) => any, getComparer: (a: T) => number | string, asc = false) => {
	const existingIndex = array.findIndex((el) => getKey(el) === getKey(item))
	const index = array.findIndex((el) => asc ? getComparer(el) >= getComparer(item) : getComparer(el) <= getComparer(item))
	if (existingIndex !== -1 && existingIndex === index) {
		array.splice(existingIndex, 1, item)
		return array
	}
	if (existingIndex !== -1 && existingIndex !== index) array.splice(existingIndex, 1)
	if (index !== -1) array.splice(index, 0, item)
	else if (array.length === 0) array.push(item)
	else {
		const existingIsGreater = getComparer(array[0]) >= getComparer(item)
		if (existingIsGreater) asc ? array.unshift(item) : array.push(item)
		else asc ? array.push(item) : array.unshift(item)
	}
	return array
}

export const formatCurrency = (currency: string) => {
	const currencies = {
		NGN: '&#8358;', USD: '$'
	} as Record<string, string>
	return currencies[currency] ?? currencies.USD
}

export const formatDuration = (duration: number) => {
	duration = duration < 0 ? 0 : duration
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor((duration - hours * 3600) / 60)
	const seconds = Math.floor(duration - (hours * 3600) - (minutes * 60))
	const paths = [minutes, seconds]
	if (hours > 0) paths.unshift(hours)
	return paths.map((x) => x.toString().padStart(2, '0')).join(':')
}

export const formatFileSize = (size: number) => {
	const ranges = [{ val: -1, key: 'b' }, { val: 1024, key: 'kb' },
		{ val: 1024 * 1024, key: 'mb' }, { val: 1024 * 1024 * 1024, key: 'gb' }]
	const range = ranges.find(({ val }) => size >= val)
	return `${formatNumber(size / (range?.val ?? -1))}${range?.key ?? 'b'}`
}
