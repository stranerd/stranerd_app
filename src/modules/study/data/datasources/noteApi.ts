import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBase } from '@utils/environment'
import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteBaseDataSource } from './noteBase'

export class NoteApiDataSource implements NoteBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/study/notes')
	}

	async create (data: NoteToModel) {
		return await this.stranerdClient.post<NoteToModel, NoteFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, NoteFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<NoteFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<NoteFromModel>) {
		const listener = listenOnSocket(`study/notes/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<NoteFromModel>) {
		const listener = listenOnSocket('study/notes', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<any, boolean>(`/${id}`, {})
	}

	async update (id: string, data: NoteToModel) {
		return await this.stranerdClient.put<NoteToModel, NoteFromModel>(`/${id}`, data)
	}
}
