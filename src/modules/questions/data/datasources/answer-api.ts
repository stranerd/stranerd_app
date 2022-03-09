import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { AnswerFromModel, AnswerToModel } from '../models/answer'
import { AnswerBaseDataSource } from './answer-base'

export class AnswerApiDataSource implements AnswerBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/questions')
	}

	async create (data: AnswerToModel) {
		return await this.stranerdClient.post<AnswerToModel, AnswerFromModel>('/answers', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, AnswerFromModel>(`/answers/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<AnswerFromModel>>('/answers', query)
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
		return await this.stranerdClient.put<AnswerToModel, AnswerFromModel>(`/answers/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/answers/${id}`, {})
	}

	async vote (id: string, vote: boolean) {
		await this.stranerdClient.post<any, Record<string, any>>(`/answerUpvotes/${id}/vote`, { vote })
	}
}
