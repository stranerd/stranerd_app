import { isClient } from '@utils/environment'

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
	num = Math.abs(num)
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

export const extractTextFromHTML = (html: string) => html?.trim().replace(/<[^>]+>/g, '') ?? ''

export const getStringCount = (text: string, occ: string) => (text.match(new RegExp(occ, 'gi')) ?? []).length

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

export const copyToClipboard = async (data: string) => {
	if (!isClient()) return false
	const result = await window.navigator.permissions.query({ name: 'clipboard-write' as any })
	if (result.state === 'granted' || result.state === 'prompt') {
		await window.navigator.clipboard.writeText(data)
		return true
	}
	return false
}

export function copyObject<T extends Record<any, any>> (target: T, ...sources: T[]) {
	return Object.assign(target, ...sources)
}

export const getAlphabet = (num: number) => 'abcdefghijklmnopqrstuv'.split('')[num - 1] ?? 'a'
