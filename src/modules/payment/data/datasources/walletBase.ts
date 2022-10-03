import { Listeners } from '@modules/core'
import { WalletFromModel } from '../models/wallet'
import { AccountDetails, Bank, CurrencyCountries } from '../../domain/types'

export interface WalletBaseDataSource {
	get: () => Promise<WalletFromModel>
	listen: (listener: Listeners<WalletFromModel>) => Promise<() => void>
	subscribeToPlan: (subscriptionId: string) => Promise<WalletFromModel>
	cancelSubscription: () => Promise<WalletFromModel>
	getBanks: (country: CurrencyCountries) => Promise<Bank[]>
	updateAccount: (account: AccountDetails) => Promise<WalletFromModel>
}
