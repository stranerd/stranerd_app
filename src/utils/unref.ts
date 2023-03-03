import { isRef, unref } from 'vue'

const isObject = (val: any) => val !== null && typeof val === 'object'
const isArray = Array.isArray

export const deepUnref = (val: any): any => {
	const checkedVal = isRef(val) ? unref(val) : val

	if (!isObject(checkedVal)) return checkedVal

	if (isArray(checkedVal)) return checkedVal.map(smartUnref)

	const unreffed: Record<string, any> = {}

	Object.keys(checkedVal).forEach((key) => {
		unreffed[key] = smartUnref(checkedVal[key])
	})

	return unreffed
}
const smartUnref = (val: any) => {
	if (val !== null && !isRef(val) && typeof val === 'object') return deepUnref(val)
	return unref(val)
}