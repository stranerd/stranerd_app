import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { UserBaseDataSource } from '../datasources/user-base'
import { UserFromModel } from '../models/user'

export class UserApiDataSource implements UserBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/users/users')
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, UserFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<UserFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<UserFromModel>) {
		const listener = listenOnSocket(`users/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<UserFromModel>) {
		const listener = listenOnSocket('users', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async updateStreak () {
		type Streak = { skip: boolean, increase: boolean, reset: boolean, streak: number }
		await this.stranerdClient.post<{}, Streak>('/streak', {})
	}
}
