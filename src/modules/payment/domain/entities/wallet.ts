import { BaseEntity } from '@modules/core'
import { AccountDetails, Currencies, SubscriptionModel } from '../types'

export class WalletEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly balance: { amount: number, currency: Currencies }
	public readonly account: AccountDetails | null
	public readonly subscription: SubscriptionModel
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, userId, balance, account, subscription, createdAt, updatedAt
	             }: WalletConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.balance = balance
		this.account = account
		this.subscription = subscription
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type WalletConstructorArgs = {
	id: string
	userId: string
	balance: { amount: number, currency: Currencies }
	account: AccountDetails | null
	subscription: SubscriptionModel
	createdAt: number
	updatedAt: number
}
