import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class CommentApiDataSource implements CommentBaseDataSource {
	private readonly stranerdClient: HttpClient
	private readonly path: string

	constructor (path: string) {
		this.path = path
		this.stranerdClient = new HttpClient(apiBases.STRANERD + `/questions/${path}`)
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

	async update (id: string, data: CommentToModel) {
		await this.stranerdClient.put<CommentToModel, CommentFromModel>(`/${id}`, data)
	}

	async listenToOne (id: string, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`${this.path}/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`${this.path}`, listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
