import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestion'
import { PastQuestionBaseDataSource } from './pastQuestion-base'

export class PastQuestionApiDataSource implements PastQuestionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/pastQuestions')
	}

	async create (data: PastQuestionToModel) {
		const pastQuestion = await this.stranerdClient.post<PastQuestionToModel, PastQuestionFromModel>('/', data)
		return pastQuestion.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, PastQuestionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<PastQuestionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<PastQuestionFromModel>) {
		const listener = listenOnSocket(`pastQuestions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<PastQuestionFromModel>) {
		const listener = listenOnSocket('pastQuestions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: PastQuestionToModel) {
		await this.stranerdClient.put<PastQuestionToModel, PastQuestionFromModel>(`/${id}`, data)
	}
}
