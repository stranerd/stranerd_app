import { SubscriptionModel } from '../../domain/types'

export interface WalletFromModel {
	id: string
	userId: string
	balance: { amount: number }
	subscription: SubscriptionModel
	createdAt: number
	updatedAt: number
}
