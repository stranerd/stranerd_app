import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ClassToModel } from '../../data/models/class'
import { ClassEntity } from '../entities/class'

export interface IClassRepository {
	add: (data: ClassToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<ClassEntity>>
	listenToOne: (id: string, listener: Listeners<ClassEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ClassEntity>, matches: (entity: ClassEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<ClassEntity | null>
	update: (id: string, data: ClassToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
}
