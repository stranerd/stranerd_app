import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'
import { FlashCardBaseDataSource } from './flashCard-base'
import { getSetIdQuery } from '@utils/query'

export class FlashCardApiDataSource implements FlashCardBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/flashCards')
	}

	async create (data: FlashCardToModel) {
		const flashCard = await this.stranerdClient.post<FlashCardToModel, FlashCardFromModel>('/', { ...getSetIdQuery(), ...data })
		return flashCard.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, FlashCardFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<FlashCardFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<FlashCardFromModel>) {
		const listener = listenOnSocket(`flashCards/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<FlashCardFromModel>) {
		const listener = listenOnSocket('flashCards', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: FlashCardToModel) {
		await this.stranerdClient.put<FlashCardToModel, FlashCardFromModel>(`/${id}`, data)
	}
}
