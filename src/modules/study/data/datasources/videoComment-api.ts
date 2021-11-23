import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { VideoCommentFromModel, VideoCommentToModel } from '../models/videoComment'
import { VideoCommentBaseDataSource } from './videoComment-base'

export class VideoCommentApiDataSource implements VideoCommentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/videoComments')
	}

	async create (data: VideoCommentToModel) {
		const videoComment = await this.stranerdClient.post<VideoCommentToModel, VideoCommentFromModel>('/', data)
		return videoComment.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, VideoCommentFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<VideoCommentFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<VideoCommentFromModel>) {
		const listener = listenOnSocket(`videoComments/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<VideoCommentFromModel>) {
		const listener = listenOnSocket('videoComments', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: VideoCommentToModel) {
		await this.stranerdClient.put<VideoCommentToModel, VideoCommentFromModel>(`/${id}`, data)
	}
}
