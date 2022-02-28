import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { SetFromModel, SetToModel } from '../models/set'
import { SetBaseDataSource } from './set-base'

export class SetApiDataSource implements SetBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/sets')
	}

	async create (data: SetToModel) {
		const set = await this.stranerdClient.post<SetToModel, SetFromModel>('/', data)
		return set.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, SetFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SetFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<SetFromModel>) {
		const listener = listenOnSocket(`study/sets/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<SetFromModel>) {
		const listener = listenOnSocket('study/sets', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: SetToModel) {
		await this.stranerdClient.put<SetToModel, SetFromModel>(`/${id}`, data)
	}

	async saveProp (setId: string, type: string, propIds: string[]) {
		await this.stranerdClient.put<any, any>(`/${setId}/save`, { type, propIds })
	}

	async deleteProp (setId: string, type: string, propIds: string[]) {
		await this.stranerdClient.put<any, any>(`/${setId}/delete`, { type, propIds })
	}
}
