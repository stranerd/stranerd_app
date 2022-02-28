import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { GroupToModel } from '../../data/models/group'
import { GroupEntity } from '../entities/group'

export interface IGroupRepository {
	add: (data: GroupToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<GroupEntity>>
	listenToOne: (id: string, listener: Listeners<GroupEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<GroupEntity>, matches: (entity: GroupEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<GroupEntity | null>
	update: (id: string, data: GroupToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
