import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { GroupFromModel, GroupToModel } from '../models/group'

export interface GroupBaseDataSource {
	create: (data: GroupToModel) => Promise<GroupFromModel>
	update: (id: string, data: GroupToModel) => Promise<GroupFromModel>
	get: (query: QueryParams) => Promise<QueryResults<GroupFromModel>>
	listenToOne: (id: string, listener: Listeners<GroupFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<GroupFromModel>) => Promise<() => void>
	find: (id: string) => Promise<GroupFromModel | null>
	delete: (id: string) => Promise<void>
}
