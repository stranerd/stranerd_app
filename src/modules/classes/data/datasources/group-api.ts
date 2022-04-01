import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { GroupFromModel, GroupToModel } from '../models/group'
import { GroupBaseDataSource } from './group-base'

export class GroupApiDataSource implements GroupBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/classes/groups')
	}

	async create (data: GroupToModel) {
		return await this.stranerdClient.post<GroupToModel, GroupFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, GroupFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<GroupFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<GroupFromModel>) {
		const listener = listenOnSocket(`classes/groups/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<GroupFromModel>) {
		const listener = listenOnSocket('classes/groups', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: GroupToModel) {
		return await this.stranerdClient.put<GroupToModel, GroupFromModel>(`/${id}`, data)
	}
}
