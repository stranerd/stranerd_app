import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ClassFromModel, ClassToModel } from '../models/class'
import { ClassBaseDataSource } from './class-base'
import { ClassUsers } from '@modules/classes/domain/entities/class'

export class ClassApiDataSource implements ClassBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/classes/classes')
	}

	async create (data: ClassToModel) {
		return await this.stranerdClient.post<ClassToModel, ClassFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, ClassFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ClassFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<ClassFromModel>) {
		const listener = listenOnSocket(`classes/classes/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ClassFromModel>) {
		const listener = listenOnSocket('classes/classes', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: ClassToModel) {
		return await this.stranerdClient.put<ClassToModel, ClassFromModel>(`/${id}`, data)
	}

	async requestClass (id: string, request: boolean) {
		await this.stranerdClient.post<{ request: boolean }, boolean>(`/${id}/requests`, { request })
	}

	async leaveClass (id: string) {
		await this.stranerdClient.put<{}, boolean>(`/${id}/leave`, {})
	}

	async acceptRequest (id: string, userId: string, accept: boolean) {
		await this.stranerdClient.put<{ accept: boolean, userId: string }, boolean>(`/${id}/requests`, {
			accept,
			userId
		})
	}

	async addMembers (id: string, userIds: string[], add: boolean) {
		await this.stranerdClient.put<{ add: boolean, userIds: string[] }, boolean>(`/${id}/members`, { add, userIds })
	}

	async changeMemberRole (id: string, userId: string, role: ClassUsers, add: boolean) {
		await this.stranerdClient.put<{ add: boolean, userId: string, role: ClassUsers }, boolean>(`/${id}/roles`, {
			add,
			userId,
			role
		})
	}
}
