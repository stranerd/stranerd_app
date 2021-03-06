import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CourseFromModel, CourseToModel } from '../models/course'

export interface CourseBaseDataSource {
	create: (data: CourseToModel) => Promise<CourseFromModel>
	update: (id: string, data: CourseToModel) => Promise<CourseFromModel>
	get: (query: QueryParams) => Promise<QueryResults<CourseFromModel>>
	listenToOne: (id: string, listener: Listeners<CourseFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<CourseFromModel>) => Promise<() => void>
	find: (id: string) => Promise<CourseFromModel | null>
	delete: (id: string) => Promise<void>
}
