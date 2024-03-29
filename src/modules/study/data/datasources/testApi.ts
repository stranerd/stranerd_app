import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { TestFromModel, TestToModel } from '../models/test'
import { TestBaseDataSource } from './testBase'

export class TestApiDataSource implements TestBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/tests')
	}

	async create (data: TestToModel) {
		return await this.stranerdClient.post<TestToModel, TestFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, TestFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TestFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TestFromModel>) {
		const listener = listenOnSocket(`study/tests/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TestFromModel>) {
		const listener = listenOnSocket('study/tests', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async end (id: string) {
		await this.stranerdClient.put<any, boolean>(`/${id}/end`, {})
	}

	async updateAnswer (id: string, questionId: string, answer: number | string) {
		await this.stranerdClient.put<{ questionId: string, answer: number | string }, boolean>(`/${id}/answer`, {
			questionId, answer
		})
	}
}
