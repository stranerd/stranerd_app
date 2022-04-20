import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { InstitutionFromModel, InstitutionToModel } from '../models/institution'
import { InstitutionBaseDataSource } from './institution-base'

export class InstitutionApiDataSource implements InstitutionBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/school/institutions')
	}

	async create (data: InstitutionToModel) {
		return await this.stranerdClient.post<InstitutionToModel, InstitutionFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, InstitutionFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<InstitutionFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<InstitutionFromModel>) {
		const listener = listenOnSocket(`school/institutions/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<InstitutionFromModel>) {
		const listener = listenOnSocket('school/institutions', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: InstitutionToModel) {
		return await this.stranerdClient.put<InstitutionToModel, InstitutionFromModel>(`/${id}`, data)
	}
}
