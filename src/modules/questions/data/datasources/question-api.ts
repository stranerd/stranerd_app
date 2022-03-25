import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { QuestionFromModel, QuestionToModel } from '../models/question'
import { QuestionBaseDataSource } from './question-base'

export class QuestionApiDataSource implements QuestionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/questions/questions')
	}

	async create (data: QuestionToModel) {
		return await this.stranerdClient.post<QuestionToModel, QuestionFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, QuestionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<QuestionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<QuestionFromModel>) {
		const listener = listenOnSocket(`questions/questions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<QuestionFromModel>) {
		const listener = listenOnSocket('questions/questions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async markBestAnswer (questionId: string, answerId: string) {
		await this.stranerdClient.put<{ answerId: string }, boolean>(`/${questionId}/best`, { answerId })
	}

	async update (id: string, data: QuestionToModel) {
		return await this.stranerdClient.put<QuestionToModel, QuestionFromModel>(`/${id}`, data)
	}
}
