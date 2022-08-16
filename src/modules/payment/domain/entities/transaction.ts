import { BaseEntity } from '@modules/core'
import { Currencies, TransactionData, TransactionStatus, TransactionType } from '../types'

export class TransactionEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly email: string
	public readonly title: string
	public readonly amount: number
	public readonly currency: Currencies
	public readonly status: TransactionStatus
	public readonly data: TransactionData
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
					 id, userId, email, status, data, title, amount, currency,
					 createdAt, updatedAt
				 }: TransactionConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.email = email
		this.title = title
		this.amount = amount
		this.currency = currency
		this.status = status
		this.data = data
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isNegative () {
		return [TransactionType.Subscription].includes(this.data.type)
	}

	get failed () {
		return this.status === TransactionStatus.failed
	}
}

type TransactionConstructorArgs = {
	id: string
	userId: string
	email: string
	title: string
	amount: number
	currency: Currencies
	status: TransactionStatus
	data: TransactionData
	createdAt: number
	updatedAt: number
}
