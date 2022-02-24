import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ClassFromModel, ClassToModel } from '../models/class'

export interface ClassBaseDataSource {
	create: (data: ClassToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<ClassFromModel>>
	listenToOne: (id: string, listener: Listeners<ClassFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ClassFromModel>) => Promise<() => void>
	find: (id: string) => Promise<ClassFromModel | null>
	update: (id: string, data: ClassToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
} 
