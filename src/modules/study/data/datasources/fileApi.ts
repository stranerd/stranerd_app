import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { FileFromModel, FileToModel } from '../models/file'
import { FileBaseDataSource } from './fileBase'

export class FileApiDataSource implements FileBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/files')
	}

	async create (data: FileToModel) {
		return await this.stranerdClient.post<FileToModel, FileFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, FileFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<FileFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<FileFromModel>) {
		const listener = listenOnSocket(`study/files/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<FileFromModel>) {
		const listener = listenOnSocket('study/files', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: FileToModel) {
		return await this.stranerdClient.put<FileToModel, FileFromModel>(`/${id}`, data)
	}
}
