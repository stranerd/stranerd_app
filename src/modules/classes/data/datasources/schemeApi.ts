import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { SchemeFromModel, SchemeToModel } from '../models/scheme'
import { SchemeBaseDataSource } from './schemeBase'

export class SchemeApiDataSource implements SchemeBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes')
	}

	async create (classId: string, data: SchemeToModel) {
		return await this.stranerdClient.post<SchemeToModel, SchemeFromModel>(`/${classId}/schemes`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, SchemeFromModel>(`/${classId}/schemes/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SchemeFromModel>>(`/${classId}/schemes`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<SchemeFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/schemes/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<SchemeFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/schemes`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (classId: string, id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${classId}/schemes/${id}`, {})
	}

	async update (classId: string, id: string, data: SchemeToModel) {
		return await this.stranerdClient.put<SchemeToModel, SchemeFromModel>(`/${classId}/schemes/${id}`, data)
	}

	async markRead (classId: string) {
		return await this.stranerdClient.post<any, boolean>(`/${classId}/schemes/read`, {})
	}
}
