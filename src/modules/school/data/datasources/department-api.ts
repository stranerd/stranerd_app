import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { DepartmentFromModel, DepartmentToModel } from '../models/department'
import { DepartmentBaseDataSource } from './department-base'

export class DepartmentApiDataSource implements DepartmentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/school/departments')
	}

	async create (data: DepartmentToModel) {
		return await this.stranerdClient.post<DepartmentToModel, DepartmentFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, DepartmentFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<DepartmentFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<DepartmentFromModel>) {
		const listener = listenOnSocket(`school/departments/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<DepartmentFromModel>) {
		const listener = listenOnSocket('school/departments', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: DepartmentToModel) {
		return await this.stranerdClient.put<DepartmentToModel, DepartmentFromModel>(`/${id}`, data)
	}
}
