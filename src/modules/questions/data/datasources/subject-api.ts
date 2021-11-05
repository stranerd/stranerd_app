import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectBaseDataSource } from './subject-base'

export class SubjectApiDataSource implements SubjectBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/questions/subjects')
	}

	async add (data: SubjectToModel) {
		const subject = await this.stranerdClient.post<SubjectToModel, SubjectFromModel>('/', data)
		return subject.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, SubjectFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SubjectFromModel>>('/', query)
	}

	async update (id: string, data: SubjectToModel) {
		await this.stranerdClient.put<SubjectToModel, SubjectFromModel>(`/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<string, boolean>(`/${id}`, '')
	}

	async listenToOne (id: string, listeners: Listeners<SubjectFromModel>) {
		const listener = listenOnSocket(`subjects/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<SubjectFromModel>) {
		const listener = listenOnSocket('subjects', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
