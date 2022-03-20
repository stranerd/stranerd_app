import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DepartmentFromModel, DepartmentToModel } from '../models/department'

export interface DepartmentBaseDataSource {
	create: (data: DepartmentToModel) => Promise<DepartmentFromModel>
	update: (id: string, data: DepartmentToModel) => Promise<DepartmentFromModel>
	get: (query: QueryParams) => Promise<QueryResults<DepartmentFromModel>>
	listenToOne: (id: string, listener: Listeners<DepartmentFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<DepartmentFromModel>) => Promise<() => void>
	find: (id: string) => Promise<DepartmentFromModel | null>
	delete: (id: string) => Promise<void>
}
