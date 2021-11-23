import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NoteFromModel, NoteToModel } from '../models/note'

export interface NoteBaseDataSource {
	create: (data: NoteToModel) => Promise<string>
	update: (id: string, data: NoteToModel) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<NoteFromModel>>
	listenToOne: (id: string, listener: Listeners<NoteFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<NoteFromModel>) => Promise<() => void>
	find: (id: string) => Promise<NoteFromModel | null>
	delete: (id: string) => Promise<void>
}
