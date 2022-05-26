import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DiscussionToModel } from '../../data/models/discussion'
import { DiscussionEntity } from '../entities/discussion'

export interface IDiscussionRepository {
	add: (classId: string, data: DiscussionToModel) => Promise<DiscussionEntity>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<DiscussionEntity>>
	listenToOne: (classId: string, id: string, listener: Listeners<DiscussionEntity>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<DiscussionEntity>, matches: (entity: DiscussionEntity) => boolean) => Promise<() => void>
	find: (classId: string, id: string) => Promise<DiscussionEntity | null>
	markRead: (classId: string, groupId: string) => Promise<boolean>
}
