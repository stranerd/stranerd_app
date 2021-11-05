import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { NotificationFromModel } from '../models/notification'
import { NotificationBaseDataSource } from './notification-base'

export class NotificationApiDataSource implements NotificationBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/notifications')
	}

	async find (_: string, id: string) {
		return await this.stranerdClient.get<{}, NotificationFromModel | null>(`/${id}`, {})
	}

	async get (_: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<NotificationFromModel>>('/', query)
	}

	async listenToOne (_: string, id: string, listeners: Listeners<NotificationFromModel>) {
		const listener = listenOnSocket(`notifications/${id}`, listeners)
		const model = await this.find(_, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (_: string, query: QueryParams, listeners: Listeners<NotificationFromModel>) {
		const listener = listenOnSocket('notifications', listeners)
		const models = await this.get(_, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async markSeen (_: string, id: string, seen: boolean) {
		return await this.stranerdClient.put<{ seen: boolean }, boolean>(`/${id}/seen`, { seen })
	}
}
