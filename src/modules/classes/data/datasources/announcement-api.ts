import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'
import { AnnouncementBaseDataSource } from './announcement-base'

export class AnnouncementApiDataSource implements AnnouncementBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/classes/announcements')
	}

	async create (data: AnnouncementToModel) {
		return await this.stranerdClient.post<AnnouncementToModel, AnnouncementFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, AnnouncementFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<AnnouncementFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<AnnouncementFromModel>) {
		const listener = listenOnSocket(`classes/announcements/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<AnnouncementFromModel>) {
		const listener = listenOnSocket('classes/announcements', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: AnnouncementToModel) {
		return await this.stranerdClient.put<AnnouncementToModel, AnnouncementFromModel>(`/${id}`, data)
	}
}
