import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { MethodFromModel } from '../models/method'
import { MethodBaseDataSource } from './methodBase'

export class MethodApiDataSource implements MethodBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/payment/methods')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, MethodFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<MethodFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<MethodFromModel>) {
		const listener = listenOnSocket(`payment/methods/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<MethodFromModel>) {
		const listener = listenOnSocket('payment/methods', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async makePrimary (id: string) {
		return await this.stranerdClient.put<any, MethodFromModel>(`/${id}/primary`, {})
	}
}
