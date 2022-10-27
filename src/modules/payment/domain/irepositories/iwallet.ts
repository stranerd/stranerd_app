import { Listeners } from '@modules/core'
import { WalletEntity } from '../entities/wallet'
import { AccountDetails, Bank, CurrencyCountries } from '../types'

export interface IWalletRepository {
	get: () => Promise<WalletEntity>
	listen: (listener: Listeners<WalletEntity>) => Promise<() => void>
	subscribeToPlan: (planId: string) => Promise<WalletEntity>
	cancelSubscription: () => Promise<WalletEntity>
	getBanks: (country: CurrencyCountries) => Promise<Bank[]>
	updateAccount: (account: AccountDetails) => Promise<WalletEntity>
}
