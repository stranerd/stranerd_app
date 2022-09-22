import { BaseEntity } from '@modules/core'

export class CardEntity extends BaseEntity {
	public readonly id: string
	public readonly last4Digits: string
	public readonly country: string
	public readonly type: string
	public readonly token: string
	public readonly expiredAt: number
	public readonly expired: boolean
	public readonly primary: boolean
	public readonly userId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, last4Digits, country, type, token,
		             expiredAt, expired, primary, userId, createdAt, updatedAt
	             }: CardConstructorArgs) {
		super()
		this.id = id
		this.last4Digits = last4Digits
		this.country = country
		this.type = type
		this.token = token
		this.expiredAt = expiredAt
		this.expired = expired
		this.primary = primary
		this.userId = userId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get expiry () {
		const date = new Date(this.expiredAt)
		return [
			date.getMonth().toString().padStart(2, '0'),
			date.getFullYear().toString().slice(-2)
		].join('/')
	}
}

type CardConstructorArgs = {
	id: string
	last4Digits: string
	country: string
	type: string
	token: string
	expiredAt: number
	expired: boolean
	primary: boolean
	userId: string
	createdAt: number
	updatedAt: number
}
