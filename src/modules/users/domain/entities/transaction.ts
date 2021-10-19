import { BaseEntity } from '@modules/core'

export class TransactionEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly isGold: boolean
	public readonly event: string
	public readonly amount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, userId, isGold, event, amount, createdAt, updatedAt }: TransactionConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.isGold = isGold
		this.event = event
		this.amount = amount
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isGain () {
		return this.amount >= 0
	}
}

type TransactionConstructorArgs = {
	id: string, userId: string, isGold: boolean, event: string, amount: number, createdAt: number, updatedAt: number
}
