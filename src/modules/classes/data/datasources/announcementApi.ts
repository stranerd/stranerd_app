import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'
import { AnnouncementBaseDataSource } from './announcementBase'

export class AnnouncementApiDataSource implements AnnouncementBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/classes')
	}

	async create (classId: string, data: AnnouncementToModel) {
		return await this.stranerdClient.post<AnnouncementToModel, AnnouncementFromModel>(`/${classId}/announcements`, data)
	}

	async find (classId: string, id: string) {
		return await this.stranerdClient.get<any, AnnouncementFromModel>(`/${classId}/announcements/${id}`, {})
	}

	async get (classId: string, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<AnnouncementFromModel>>(`/${classId}/announcements`, query)
	}

	async listenToOne (classId: string, id: string, listeners: Listeners<AnnouncementFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/announcements/${id}`, listeners)
		const model = await this.find(classId, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (classId: string, query: QueryParams, listeners: Listeners<AnnouncementFromModel>) {
		const listener = listenOnSocket(`classes/${classId}/announcements`, listeners)
		const models = await this.get(classId, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (classId: string, id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${classId}/announcements/${id}`, {})
	}

	async update (classId: string, id: string, data: AnnouncementToModel) {
		return await this.stranerdClient.put<AnnouncementToModel, AnnouncementFromModel>(`/${classId}/announcements/${id}`, data)
	}

	async markRead (classId: string) {
		return await this.stranerdClient.post<any, boolean>(`/${classId}/announcements/read`, {})
	}
}
