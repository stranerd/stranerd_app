import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { FacultyFromModel, FacultyToModel } from '../models/faculty'
import { FacultyBaseDataSource } from './faculty-base'

export class FacultyApiDataSource implements FacultyBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/school/faculties')
	}

	async create (data: FacultyToModel) {
		return await this.stranerdClient.post<FacultyToModel, FacultyFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, FacultyFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<FacultyFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<FacultyFromModel>) {
		const listener = listenOnSocket(`school/faculties/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<FacultyFromModel>) {
		const listener = listenOnSocket('school/faculties', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: FacultyToModel) {
		return await this.stranerdClient.put<FacultyToModel, FacultyFromModel>(`/${id}`, data)
	}
}
