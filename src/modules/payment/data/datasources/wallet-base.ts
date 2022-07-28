import { Listeners } from '@modules/core'
import { WalletFromModel } from '../models/wallet'

export interface WalletBaseDataSource {
	get: () => Promise<WalletFromModel>
	listen: (listener: Listeners<WalletFromModel>) => Promise<() => void>
	subscribeToPlan: (subscriptionId: string) => Promise<WalletFromModel>
	cancelSubscription: () => Promise<WalletFromModel>
}
