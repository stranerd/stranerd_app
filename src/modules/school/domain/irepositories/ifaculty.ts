import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FacultyEntity } from '../entities/faculty'
import { FacultyToModel } from '../../data/models/faculty'

export interface IFacultyRepository {
	add: (data: FacultyToModel) => Promise<FacultyEntity>
	get: (query: QueryParams) => Promise<QueryResults<FacultyEntity>>
	listenToOne: (id: string, listener: Listeners<FacultyEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FacultyEntity>, matches: (entity: FacultyEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<FacultyEntity | null>
	update: (id: string, data: FacultyToModel) => Promise<FacultyEntity>
	delete: (id: string) => Promise<void>
}
