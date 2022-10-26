import { BaseEntity } from '@modules/core'
import { MethodData } from '../types'

export class MethodEntity extends BaseEntity {
	public readonly id: string
	public readonly data: MethodData
	public readonly token: string
	public readonly primary: boolean
	public readonly userId: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, data, token, primary, userId, createdAt, updatedAt
	             }: MethodConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.token = token
		this.primary = primary
		this.userId = userId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get expiry () {
		const date = new Date(this.data.expiredAt)
		return [
			date.getMonth().toString().padStart(2, '0'),
			date.getFullYear().toString().slice(-2)
		].join('/')
	}
}

type MethodConstructorArgs = {
	id: string
	data: MethodData
	token: string
	primary: boolean
	userId: string
	createdAt: number
	updatedAt: number
}
