import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { LikeFromModel, LikeToModel } from '../models/like'
import { LikeBaseDataSource } from './like-base'

export class LikeApiDataSource implements LikeBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/interactions/likes')
	}

	async create (data: LikeToModel) {
		return await this.stranerdClient.post<LikeToModel, LikeFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, LikeFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<LikeFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<LikeFromModel>) {
		const listener = listenOnSocket(`interactions/likes/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<LikeFromModel>) {
		const listener = listenOnSocket('interactions/likes', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
