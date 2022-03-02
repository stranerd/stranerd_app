import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'

export interface DiscussionBaseDataSource {
	create: (data: DiscussionToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<DiscussionFromModel>>
	listenToOne: (id: string, listener: Listeners<DiscussionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<DiscussionFromModel>) => Promise<() => void>
	find: (id: string) => Promise<DiscussionFromModel | null>
}
