import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NoteEntity } from '../entities/note'
import { NoteToModel } from '../../data/models/note'

export interface INoteRepository {
	add: (data: NoteToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<NoteEntity>>
	listenToOne: (id: string, listener: Listeners<NoteEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<NoteEntity>, matches: (entity: NoteEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<NoteEntity | null>
	update: (id: string, data: NoteToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
