import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { ConnectFromModel } from '../models/connect'
import { ConnectBaseDataSource } from './connect-base'

export class ConnectApiDataSource implements ConnectBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/users/connects')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, ConnectFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ConnectFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<ConnectFromModel>) {
		const listener = listenOnSocket(`users/connects/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ConnectFromModel>) {
		const listener = listenOnSocket('users/connects', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async create (userId: string) {
		return await this.stranerdClient.post<{ to: string }, ConnectFromModel>('/', { to: userId })
	}

	async accept (id: string, accept: boolean) {
		return await this.stranerdClient.put<any, boolean>(`/${id}/accept`, { accept })
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}
}
