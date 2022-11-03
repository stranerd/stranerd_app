import { HttpClient, Listeners, listenOnSocket } from '@modules/core'
import { apiBase } from '@utils/environment'
import { WalletFromModel } from '../models/wallet'
import { WalletBaseDataSource } from './walletBase'
import { AccountDetails, Bank, CurrencyCountries } from '../../domain/types'

export class WalletApiDataSource implements WalletBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/payment/wallets')
	}

	async get () {
		return await this.stranerdClient.get<any, WalletFromModel>('/', {})
	}

	async listen (listeners: Listeners<WalletFromModel>) {
		const listener = listenOnSocket('payment/wallets', listeners)
		const model = await this.get()
		await listeners.updated(model)
		return listener
	}

	async subscribeToPlan (planId: string) {
		return await this.stranerdClient.post<{ planId: string }, WalletFromModel>('/subscriptions', { planId })
	}

	async cancelSubscription () {
		return await this.stranerdClient.delete<any, WalletFromModel>('/subscriptions', {})
	}

	async getBanks (country: CurrencyCountries) {
		return await this.stranerdClient.get<any, Bank[]>(`/banks/${country}`, {})
	}

	async updateAccount (account: AccountDetails) {
		return await this.stranerdClient.post<AccountDetails, WalletFromModel>('/account', account)
	}
}
