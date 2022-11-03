import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { ViewFromModel, ViewToModel } from '../models/view'
import { ViewBaseDataSource } from './viewBase'

export class ViewApiDataSource implements ViewBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/interactions/views')
	}

	async create (data: ViewToModel) {
		return await this.stranerdClient.post<ViewToModel, ViewFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, ViewFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ViewFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<ViewFromModel>) {
		const listener = listenOnSocket(`interactions/views/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ViewFromModel>) {
		const listener = listenOnSocket('interactions/views', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
