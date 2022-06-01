import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SchemeToModel } from '../../data/models/scheme'
import { SchemeEntity } from '../entities/scheme'

export interface ISchemeRepository {
	add: (classId: string, data: SchemeToModel) => Promise<SchemeEntity>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<SchemeEntity>>
	listenToOne: (classId: string, id: string, listener: Listeners<SchemeEntity>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<SchemeEntity>, matches: (entity: SchemeEntity) => boolean) => Promise<() => void>
	find: (classId: string, id: string) => Promise<SchemeEntity | null>
	update: (classId: string, id: string, data: SchemeToModel) => Promise<SchemeEntity>
	delete: (classId: string, id: string) => Promise<void>
	markRead: (classId: string) => Promise<boolean>
}
