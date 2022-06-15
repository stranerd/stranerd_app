import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { ViewFromModel, ViewToModel } from '../models/view'
import { ViewBaseDataSource } from './view-base'
import { InteractionEntity } from '../../domain/types'

export class ViewApiDataSource implements ViewBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/interactions/views')
	}

	async create (data: ViewToModel) {
		return await this.stranerdClient.post<ViewToModel, ViewFromModel>('/', data)
	}

	async find (entity: InteractionEntity, id: string) {
		return await this.stranerdClient.get<any, ViewFromModel>(`/${entity.type}/${entity.id}/${id}`, {})
	}

	async get (entity: InteractionEntity, query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ViewFromModel>>(`/${entity.type}/${entity.id}/`, query)
	}

	async listenToOne (entity: InteractionEntity, id: string, listeners: Listeners<ViewFromModel>) {
		const listener = listenOnSocket(`interactions/views/${entity.type}/${entity.id}/${id}`, listeners)
		const model = await this.find(entity, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (entity: InteractionEntity, query: QueryParams, listeners: Listeners<ViewFromModel>) {
		const listener = listenOnSocket(`interactions/views/${entity.type}/${entity.id}`, listeners)
		const models = await this.get(entity, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}
}
