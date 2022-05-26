import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'

export interface DiscussionBaseDataSource {
	create: (classId: string, data: DiscussionToModel) => Promise<DiscussionFromModel>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<DiscussionFromModel>>
	listenToOne: (classId: string, id: string, listener: Listeners<DiscussionFromModel>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<DiscussionFromModel>) => Promise<() => void>
	find: (classId: string, id: string) => Promise<DiscussionFromModel | null>
	markRead: (classId: string, groupId: string) => Promise<boolean>
}
