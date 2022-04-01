import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentBaseDataSource } from './comment-base'

export class CommentApiDataSource implements CommentBaseDataSource {
	private readonly stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/questions/answerComments')
	}

	async create (data: CommentToModel) {
		return await this.stranerdClient.post<CommentToModel, CommentFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, CommentFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<CommentFromModel>>('/', query)
	}

	async update (id: string, data: CommentToModel) {
		return await this.stranerdClient.put<CommentToModel, CommentFromModel>(`/${id}`, data)
	}

	async listenToOne (id: string, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket(`questions/answerComments/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<CommentFromModel>) {
		const listener = listenOnSocket('questions/answerComments', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
