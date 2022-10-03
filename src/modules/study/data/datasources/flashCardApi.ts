import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'
import { FlashCardBaseDataSource } from './flashCardBase'

export class FlashCardApiDataSource implements FlashCardBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/flashCards')
	}

	async create (data: FlashCardToModel) {
		return await this.stranerdClient.post<FlashCardToModel, FlashCardFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, FlashCardFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<FlashCardFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<FlashCardFromModel>) {
		const listener = listenOnSocket(`study/flashCards/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<FlashCardFromModel>) {
		const listener = listenOnSocket('study/flashCards', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: FlashCardToModel) {
		return await this.stranerdClient.put<FlashCardToModel, FlashCardFromModel>(`/${id}`, data)
	}
}
