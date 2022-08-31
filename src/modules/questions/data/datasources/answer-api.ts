import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerApiDataSource implements AnswerBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/questions/answers')
	}

	async create (data: AnswerToModel) {
		return await this.stranerdClient.post<AnswerToModel, AnswerFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, AnswerFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<AnswerFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<AnswerFromModel>) {
		const listener = listenOnSocket(`questions/answers/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<AnswerFromModel>) {
		const listener = listenOnSocket('questions/answers', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async update (id: string, data: AnswerToModel) {
		return await this.stranerdClient.put<AnswerToModel, AnswerFromModel>(`/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}
}
