import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { DocumentFromModel, DocumentToModel } from '../models/document'
import { DocumentBaseDataSource } from './document-base'

export class DocumentApiDataSource implements DocumentBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/documents')
	}

	async create (data: DocumentToModel) {
		return await this.stranerdClient.post<DocumentToModel, DocumentFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, DocumentFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<DocumentFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<DocumentFromModel>) {
		const listener = listenOnSocket(`study/documents/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<DocumentFromModel>) {
		const listener = listenOnSocket('study/documents', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: DocumentToModel) {
		return await this.stranerdClient.put<DocumentToModel, DocumentFromModel>(`/${id}`, data)
	}
}
