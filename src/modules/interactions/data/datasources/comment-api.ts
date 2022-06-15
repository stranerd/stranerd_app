import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'
import { InteractionEntity } from '../../domain/types'

export class CommentApiDataSource implements CommentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/interactions/comments')
	}

	async create (data: CommentToModel) {
		return await this.stranerdClient.post<CommentToModel, CommentFromModel>('/', data)
	}

	async find (entity: InteractionEntity, id: string) {
		return await this.stranerdClient.get<any, CommentFromModel>(`/${entity.type}/${entity.id}/${id}`, {})
	}

	async get (entity: InteractionEntity, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CommentFromModel>>(`/${entity.type}/${entity.id}/`, query)
	}

	async listenToOne (entity: InteractionEntity, id: string, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`interactions/comments/${entity.type}/${entity.id}/${id}`, listeners)
		const model = await this.find(entity, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (entity: InteractionEntity, query: QueryParams, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`interactions/comments/${entity.type}/${entity.id}`, listeners)
		const models = await this.get(entity, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: CommentToModel) {
		return await this.stranerdClient.put<CommentToModel, CommentFromModel>(`/${id}`, data)
	}
}
