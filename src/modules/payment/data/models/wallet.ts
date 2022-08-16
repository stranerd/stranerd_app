import { AccountDetails, Currencies, SubscriptionModel } from '../../domain/types'

export interface WalletFromModel {
	id: string
	userId: string
	balance: { amount: number, currency: Currencies }
	account: AccountDetails | null
	subscription: SubscriptionModel
	createdAt: number
	updatedAt: number
}
