import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'
import { DiscussionBaseDataSource } from './discussion-base'

export class DiscussionApiDataSource implements DiscussionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes/discussions')
	}

	async create (classId: string, data: DiscussionToModel) {
		return await this.stranerdClient.post<DiscussionToModel, DiscussionFromModel>(`/${classId}`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, DiscussionFromModel>(`/${classId}/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<DiscussionFromModel>>(`/${classId}`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<DiscussionFromModel>) {
		const listener = listenOnSocket(`classes/discussions/${classId}/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<DiscussionFromModel>) {
		const listener = listenOnSocket(`classes/discussions/${classId}`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async markRead (classId: string, groupId: string) {
		return await this.stranerdClient.post<any, boolean>(`/${classId}/${groupId}`, {})
	}
}
