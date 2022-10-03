import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { GroupFromModel, GroupToModel } from '../models/group'

export interface GroupBaseDataSource {
	create: (classId: string, data: GroupToModel) => Promise<GroupFromModel>
	update: (classId: string, id: string, data: GroupToModel) => Promise<GroupFromModel>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<GroupFromModel>>
	listenToOne: (classId: string, id: string, listener: Listeners<GroupFromModel>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<GroupFromModel>) => Promise<() => void>
	find: (classId: string, id: string) => Promise<GroupFromModel | null>
	delete: (classId: string, id: string) => Promise<void>
}
