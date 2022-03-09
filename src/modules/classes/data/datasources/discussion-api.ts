import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'
import { DiscussionBaseDataSource } from './discussion-base'

export class DiscussionApiDataSource implements DiscussionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/classes/discussions')
	}

	async create (data: DiscussionToModel) {
		return await this.stranerdClient.post<DiscussionToModel, DiscussionFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, DiscussionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<DiscussionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<DiscussionFromModel>) {
		const listener = listenOnSocket(`classes/discussions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<DiscussionFromModel>) {
		const listener = listenOnSocket('classes/discussions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
