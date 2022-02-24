import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { GroupFromModel, GroupToModel } from '../models/group'

export interface AnswerBaseDataSource {
	create: (data: GroupToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<GroupFromModel>>
	listenToOne: (id: string, listener: Listeners<GroupFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<GroupFromModel>) => Promise<() => void>
	find: (id: string) => Promise<GroupFromModel | null>
	update: (id: string, data: GroupToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
}
