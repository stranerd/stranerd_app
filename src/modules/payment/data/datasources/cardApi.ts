import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { CardFromModel } from '../models/card'
import { CardBaseDataSource } from './cardBase'

export class CardApiDataSource implements CardBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/payment/cards')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, CardFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CardFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<CardFromModel>) {
		const listener = listenOnSocket(`payment/cards/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<CardFromModel>) {
		const listener = listenOnSocket('payment/cards', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async makePrimary (id: string) {
		return await this.stranerdClient.put<any, CardFromModel>(`/${id}/primary`, {})
	}
}
