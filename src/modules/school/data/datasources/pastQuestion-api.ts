import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestion'
import { PastQuestionBaseDataSource } from './pastQuestion-base'

export class PastQuestionApiDataSource implements PastQuestionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/school/pastQuestions')
	}

	async create (data: PastQuestionToModel) {
		return await this.stranerdClient.post<PastQuestionToModel, PastQuestionFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, PastQuestionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<PastQuestionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<PastQuestionFromModel>) {
		const listener = listenOnSocket(`school/pastQuestions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<PastQuestionFromModel>) {
		const listener = listenOnSocket('school/pastQuestions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: PastQuestionToModel) {
		return await this.stranerdClient.put<PastQuestionToModel, PastQuestionFromModel>(`/${id}`, data)
	}
}
