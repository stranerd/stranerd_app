import { HttpClient, Listeners, listenOnSocket } from '@modules/core'
import { apiBase } from '@utils/environment'
import { WalletFromModel } from '../models/wallet'
import { WalletBaseDataSource } from './wallet-base'

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

	async subscribeToPlan (subscriptionId: string) {
		return await this.stranerdClient.post<{ subscriptionId: string }, WalletFromModel>('/subscriptions', { subscriptionId })
	}

	async renewSubscription () {
		return await this.stranerdClient.put<any, WalletFromModel>('/subscriptions', {})
	}

	async cancelSubscription () {
		return await this.stranerdClient.delete<any, WalletFromModel>('/subscriptions', {})
	}
}
