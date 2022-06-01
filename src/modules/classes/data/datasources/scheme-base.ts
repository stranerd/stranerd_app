import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SchemeFromModel, SchemeToModel } from '../models/scheme'

export interface SchemeBaseDataSource {
	create: (classId: string, data: SchemeToModel) => Promise<SchemeFromModel>
	update: (classId: string, id: string, data: SchemeToModel) => Promise<SchemeFromModel>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<SchemeFromModel>>
	listenToOne: (classId: string, id: string, listener: Listeners<SchemeFromModel>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<SchemeFromModel>) => Promise<() => void>
	find: (classId: string, id: string) => Promise<SchemeFromModel | null>
	delete: (classId: string, id: string) => Promise<void>
	markRead: (classId: string) => Promise<boolean>
}
