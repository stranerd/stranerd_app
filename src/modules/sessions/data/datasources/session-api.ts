import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '../../../core'
import { apiBases } from '../../../../utils/environment'
import { SessionFromModel, SessionToModel } from '../models/session'
import { SessionBaseDataSource } from './session-base'

export class SessionApiDataSource implements SessionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/sessions/sessions')
	}

	async create (data: SessionToModel) {
		const session = await this.stranerdClient.post<SessionToModel, SessionFromModel>('/', data)
		return session.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, SessionFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<SessionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<SessionFromModel>) {
		const listener = listenOnSocket(`sessions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<SessionFromModel>) {
		const listener = listenOnSocket('sessions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async accept (id: string, accepted: boolean) {
		await this.stranerdClient.put<{ accepted: boolean }, boolean>(`/${id}/accept`, { accepted })
	}

	async cancel (id: string) {
		await this.stranerdClient.put<{}, boolean>(`/${id}/cancel`, {})
	}

	async end (id: string) {
		await this.stranerdClient.put<{}, boolean>(`/${id}/end`, {})
	}
}
