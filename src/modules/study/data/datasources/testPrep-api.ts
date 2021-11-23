import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { TestPrepFromModel, TestPrepToModel } from '../models/testPrep'
import { TestPrepBaseDataSource } from './testPrep-base'

export class TestPrepApiDataSource implements TestPrepBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/testPreps')
	}

	async create (data: TestPrepToModel) {
		const testPrep = await this.stranerdClient.post<TestPrepToModel, TestPrepFromModel>('/', data)
		return testPrep.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, TestPrepFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TestPrepFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TestPrepFromModel>) {
		const listener = listenOnSocket(`testPreps/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TestPrepFromModel>) {
		const listener = listenOnSocket('testPreps', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: TestPrepToModel) {
		await this.stranerdClient.put<TestPrepToModel, TestPrepFromModel>(`/${id}`, data)
	}
}
