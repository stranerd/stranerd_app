import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteBaseDataSource } from './note-base'
import { getSetIdQuery } from '@utils/query'

export class NoteApiDataSource implements NoteBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/study/notes')
	}

	async create (data: NoteToModel) {
		const note = await this.stranerdClient.post<NoteToModel, NoteFromModel>('/', { ...getSetIdQuery(), ...data })
		return note.id
	}

	async find (id: string) {
		return await this.stranerdClient.get<{}, NoteFromModel>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<NoteFromModel>>('/', query)
	}

	async listenToOne (id: string, listeners: Listeners<NoteFromModel>) {
		const listener = listenOnSocket(`notes/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async listenToMany (query: QueryParams, listeners: Listeners<NoteFromModel>) {
		const listener = listenOnSocket('notes', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async delete (id: string) {
		await this.stranerdClient.delete<{}, boolean>(`/${id}`, {})
	}

	async update (id: string, data: NoteToModel) {
		await this.stranerdClient.put<NoteToModel, NoteFromModel>(`/${id}`, data)
	}
}
