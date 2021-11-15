import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { TransactionFromModel } from '../models/transaction'
import { TransactionBaseDataSource } from './transaction-base'

export class TransactionApiDataSource implements TransactionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/transactions')
	}

	async find (_: string, id: string) {
		return await this.stranerdClient.get<{}, TransactionFromModel | null>(`/${id}`, {})
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TransactionFromModel>>('/', query)
	}

	async listenToOne (_: string, id: string, listeners: Listeners<TransactionFromModel>) {
		const listener = listenOnSocket(`transactions/${id}`, listeners)
		const model = await this.find(_, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (_: string, query: QueryParams, listeners: Listeners<TransactionFromModel>) {
		const listener = listenOnSocket('transactions', listeners)
		const models = await this.get(_, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
