import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { LikeFromModel, LikeToModel } from '../models/like'
import { LikeBaseDataSource } from './like-base'
import { InteractionEntity } from '../../domain/types'

export class LikeApiDataSource implements LikeBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/interactions/likes')
	}

	async create (data: LikeToModel) {
		return await this.stranerdClient.post<LikeToModel, LikeFromModel>('/', data)
	}

	async find (entity: InteractionEntity, id: string) {
		return await this.stranerdClient.get<any, LikeFromModel>(`/${entity.type}/${entity.id}/${id}`, {})
	}

	async get (entity: InteractionEntity, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<LikeFromModel>>(`/${entity.type}/${entity.id}/`, query)
	}

	async listenToOne (entity: InteractionEntity, id: string, listeners: Listeners<LikeFromModel>) {
		const listener = listenOnSocket(`interactions/likes/${entity.type}/${entity.id}/${id}`, listeners)
		const model = await this.find(entity, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (entity: InteractionEntity, query: QueryParams, listeners: Listeners<LikeFromModel>) {
		const listener = listenOnSocket(`interactions/likes/${entity.type}/${entity.id}`, listeners)
		const models = await this.get(entity, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
