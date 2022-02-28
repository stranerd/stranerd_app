import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { VideoFromModel, VideoToModel } from '../models/video'
import { VideoBaseDataSource } from './video-base'
import { getSetIdQuery } from '@utils/query'

export class VideoApiDataSource implements VideoBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/videos')
	}

	async create (data: VideoToModel) {
		const video = await this.stranerdClient.post<VideoToModel, VideoFromModel>('/', { ...getSetIdQuery(), ...data })
		return video.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, VideoFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<VideoFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<VideoFromModel>) {
		const listener = listenOnSocket(`study/videos/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<VideoFromModel>) {
		const listener = listenOnSocket('study/videos', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: VideoToModel) {
		await this.stranerdClient.put<VideoToModel, VideoFromModel>(`/${id}`, data)
	}
}
