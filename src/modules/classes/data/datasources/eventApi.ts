import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { EventFromModel, EventToModel } from '../models/event'
import { EventBaseDataSource } from './eventBase'
import { EventType } from '../../domain/types'

export class EventApiDataSource implements EventBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes')
	}

	async create (classId: string, data: EventToModel) {
		return await this.stranerdClient.post<EventToModel, EventFromModel>(`/${classId}/events`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, EventFromModel>(`/${classId}/events/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<EventFromModel>>(`/${classId}/events`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<EventFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/events/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<EventFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/events`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (classId: string, id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${classId}/events/${id}`, {})
	}

	async update (classId: string, id: string, data: EventToModel) {
		return await this.stranerdClient.put<EventToModel, EventFromModel>(`/${classId}/events/${id}`, data)
	}

	async markRead (classId: string, type: EventType) {
		return await this.stranerdClient.post<any, boolean>(`/${classId}/events/read`, { type })
	}
}
