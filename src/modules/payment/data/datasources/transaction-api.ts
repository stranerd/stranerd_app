import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'
import { FlutterwaveSecrets, TransactionType } from '../../domain/types'

export class TransactionApiDataSource implements TransactionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/payment/transactions')
	}

	async getFlutterwaveSecrets () {
		return await this.stranerdClient.get<any, FlutterwaveSecrets>('/flutterwave/secrets', {})
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, TransactionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TransactionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TransactionFromModel>) {
		const listener = listenOnSocket(`payment/transactions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TransactionFromModel>) {
		const listener = listenOnSocket('payment/transactions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async create (type: TransactionType) {
		return await this.stranerdClient.post<{ data: { type: TransactionType } }, TransactionFromModel>('/', { data: { type } })
	}

	async fulfill (id: string) {
		await this.stranerdClient.put<any, boolean>(`/${id}/fulfill`, {})
	}
}
