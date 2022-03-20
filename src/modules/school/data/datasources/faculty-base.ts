import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FacultyFromModel, FacultyToModel } from '../models/faculty'

export interface FacultyBaseDataSource {
	create: (data: FacultyToModel) => Promise<FacultyFromModel>
	update: (id: string, data: FacultyToModel) => Promise<FacultyFromModel>
	get: (query: QueryParams) => Promise<QueryResults<FacultyFromModel>>
	listenToOne: (id: string, listener: Listeners<FacultyFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FacultyFromModel>) => Promise<() => void>
	find: (id: string) => Promise<FacultyFromModel | null>
	delete: (id: string) => Promise<void>
}
