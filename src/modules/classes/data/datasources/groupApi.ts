import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { GroupFromModel, GroupToModel } from '../models/group'
import { GroupBaseDataSource } from './groupBase'

export class GroupApiDataSource implements GroupBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes')
	}

	async create (classId: string, data: GroupToModel) {
		return await this.stranerdClient.post<GroupToModel, GroupFromModel>(`/${classId}/groups`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, GroupFromModel>(`/${classId}/groups/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<GroupFromModel>>(`/${classId}/groups`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<GroupFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/groups/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<GroupFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/groups`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (classId: string, id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${classId}/groups/${id}`, {})
	}

	async update (classId: string, id: string, data: GroupToModel) {
		return await this.stranerdClient.put<GroupToModel, GroupFromModel>(`/${classId}/groups/${id}`, data)
	}
}
