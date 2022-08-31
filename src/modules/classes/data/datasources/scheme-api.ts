import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { SchemeFromModel, SchemeToModel } from '../models/scheme'
import { SchemeBaseDataSource } from './scheme-base'

export class SchemeApiDataSource implements SchemeBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes/schemes')
	}

	async create (classId: string, data: SchemeToModel) {
		return await this.stranerdClient.post<SchemeToModel, SchemeFromModel>(`/${classId}`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, SchemeFromModel>(`/${classId}/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SchemeFromModel>>(`/${classId}`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<SchemeFromModel>) {
		const listener = listenOnSocket(`classes/schemes/${classId}/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<SchemeFromModel>) {
		const listener = listenOnSocket(`classes/schemes/${classId}`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (classId: string, id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${classId}/${id}`, {})
	}

	async update (classId: string, id: string, data: SchemeToModel) {
		return await this.stranerdClient.put<SchemeToModel, SchemeFromModel>(`/${classId}/${id}`, data)
	}

	async markRead (classId: string) {
		return await this.stranerdClient.post<any, boolean>(`/${classId}/read`, {})
	}
}
