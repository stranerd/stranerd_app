import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { TagFromModel } from '../models/tag'
import { TagBaseDataSource } from './tag-base'

export class TagApiDataSource implements TagBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/questions/tags')
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, TagFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<TagFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<TagFromModel>) {
		const listener = listenOnSocket(`tags/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<TagFromModel>) {
		const listener = listenOnSocket('tags', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
