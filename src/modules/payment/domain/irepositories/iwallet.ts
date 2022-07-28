import { Listeners } from '@modules/core'
import { WalletEntity } from '../entities/wallet'

export interface IWalletRepository {
	get: () => Promise<WalletEntity>
	listen: (listener: Listeners<WalletEntity>) => Promise<() => void>
	subscribeToPlan: (subscriptionId: string) => Promise<WalletEntity>
	cancelSubscription: () => Promise<WalletEntity>
}
