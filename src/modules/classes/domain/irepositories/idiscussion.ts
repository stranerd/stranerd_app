import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { DiscussionToModel } from '../../data/models/discussion'
import { DiscussionEntity } from '../entities/discussion'

export interface IDiscussionRepository {
	add: (data: DiscussionToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<DiscussionEntity>>
	listenToOne: (id: string, listener: Listeners<DiscussionEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<DiscussionEntity>, matches: (entity: DiscussionEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<DiscussionEntity | null>
	update: (id: string, data: DiscussionToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
