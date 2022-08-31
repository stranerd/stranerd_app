import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { GroupToModel } from '../../data/models/group'
import { GroupEntity } from '../entities/group'

export interface IGroupRepository {
	add: (classId: string, data: GroupToModel) => Promise<GroupEntity>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<GroupEntity>>
	listenToOne: (classId: string, id: string, listener: Listeners<GroupEntity>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<GroupEntity>, matches: (entity: GroupEntity) => boolean) => Promise<() => void>
	find: (classId: string, id: string) => Promise<GroupEntity | null>
	update: (classId: string, id: string, data: GroupToModel) => Promise<GroupEntity>
	delete: (classId: string, id: string) => Promise<void>
}
