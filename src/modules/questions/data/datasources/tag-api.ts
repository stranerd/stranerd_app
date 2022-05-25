import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { TagFromModel, TagToModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagApiDataSource implements TagBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/questions/tags')
	}

	async create (data: TagToModel) {
		return await this.stranerdClient.post<TagToModel, TagFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, TagFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TagFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TagFromModel>) {
		const listener = listenOnSocket(`questions/tags/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TagFromModel>) {
		const listener = listenOnSocket('questions/tags', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async update (id: string, data: TagToModel) {
		return await this.stranerdClient.put<TagToModel, TagFromModel>(`/${id}`, data)
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}
}
