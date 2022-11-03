import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { NotificationFromModel } from '../models/notification'
import { NotificationBaseDataSource } from './notificationBase'

export class NotificationApiDataSource implements NotificationBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/users/notifications')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, NotificationFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<NotificationFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<NotificationFromModel>) {
		const listener = listenOnSocket(`users/notifications/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<NotificationFromModel>) {
		const listener = listenOnSocket('users/notifications', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async markSeen (id: string, seen: boolean) {
		return await this.stranerdClient.put<{ seen: boolean }, boolean>(`/${id}/seen`, { seen })
	}
}
