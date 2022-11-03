import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { UserBaseDataSource } from './userBase'
import { UserFromModel } from '../models/user'
import { UserSchoolData } from '../../domain/types'

export class UserApiDataSource implements UserBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/users/users')
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, UserFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<UserFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<UserFromModel>) {
		const listener = listenOnSocket(`users/users/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<UserFromModel>) {
		const listener = listenOnSocket('users/users', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async updateSchool (school: UserSchoolData) {
		await this.stranerdClient.put<UserSchoolData, boolean>('/school', school)
	}
}
