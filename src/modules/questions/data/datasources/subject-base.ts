import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SubjectFromModel, SubjectToModel } from '../models/subject'

export interface SubjectBaseDataSource {
	add: (data: SubjectToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<SubjectFromModel>>
	find: (id: string) => Promise<SubjectFromModel | null>
	delete: (id: string) => Promise<void>
	update: (id: string, data: SubjectToModel) => Promise<void>
	listenToOne: (id: string, listener: Listeners<SubjectFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<SubjectFromModel>) => Promise<() => void>
}
