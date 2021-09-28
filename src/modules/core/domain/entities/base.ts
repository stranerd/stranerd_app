import { getRandomValue } from '@utils/commons'

export class BaseEntity {
	public hash: string

	constructor () {
		this.hash = getRandomValue()
	}

	toJSON () {
		const json = Object.assign({}, this) as Record<string, any>
		const proto = Object.getPrototypeOf(this)
		Object.getOwnPropertyNames(proto)
			.filter((k) => k !== 'constructor')
			.forEach((key) => {
				const value = this[key as keyof BaseEntity]
				// @ts-ignore
				json[key] = value?.toJSON?.() ?? value
			})
		return json
	}
}
