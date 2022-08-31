import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { TestPrepFromModel, TestPrepToModel } from '../models/testPrep'
import { TestPrepBaseDataSource } from './testPrep-base'

export class TestPrepApiDataSource implements TestPrepBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/testPreps')
	}

	async create (data: TestPrepToModel) {
		return await this.stranerdClient.post<TestPrepToModel, TestPrepFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, TestPrepFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TestPrepFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TestPrepFromModel>) {
		const listener = listenOnSocket(`study/testPreps/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TestPrepFromModel>) {
		const listener = listenOnSocket('study/testPreps', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: TestPrepToModel) {
		return await this.stranerdClient.put<TestPrepToModel, TestPrepFromModel>(`/${id}`, data)
	}
}
