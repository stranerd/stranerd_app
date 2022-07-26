import { BaseEntity } from '@modules/core'

export class CardEntity extends BaseEntity {
	public readonly id: string
	public readonly first6Digits: string
	public readonly last4Digits: string
	public readonly issuer: string
	public readonly country: string
	public readonly type: string
	public readonly token: string
	public readonly expiredAt: number
	public readonly expired: boolean
	public readonly primary: boolean
	public readonly userId: string
	public readonly email: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, first6Digits, last4Digits, issuer, country, type, token,
		             expiredAt, expired, primary, userId, email, createdAt, updatedAt
	             }: CardConstructorArgs) {
		super()
		this.id = id
		this.first6Digits = first6Digits
		this.last4Digits = last4Digits
		this.issuer = issuer
		this.country = country
		this.type = type
		this.token = token
		this.expiredAt = expiredAt
		this.expired = expired
		this.primary = primary
		this.userId = userId
		this.email = email
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
	first6Digits: string
	last4Digits: string
	issuer: string
	country: string
	type: string
	token: string
	expiredAt: number
	expired: boolean
	primary: boolean
	userId: string
	email: string
	createdAt: number
	updatedAt: number
}
