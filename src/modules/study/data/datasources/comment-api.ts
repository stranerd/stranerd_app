import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class CommentApiDataSource implements CommentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/comments')
	}

	async create (data: CommentToModel) {
		const comment = await this.stranerdClient.post<CommentToModel, CommentFromModel>('/', data)
		return comment.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, CommentFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CommentFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`study/comments/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket('study/comments', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: CommentToModel) {
		await this.stranerdClient.put<CommentToModel, CommentFromModel>(`/${id}`, data)
	}
}
