import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { EventToModel } from '../../data/models/event'
import { EventEntity } from '../entities/event'

export interface IEventRepository {
	add: (classId: string, data: EventToModel) => Promise<EventEntity>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<EventEntity>>
	listenToOne: (classId: string, id: string, listener: Listeners<EventEntity>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<EventEntity>, matches: (entity: EventEntity) => boolean) => Promise<() => void>
	find: (classId: string, id: string) => Promise<EventEntity | null>
	update: (classId: string, id: string, data: EventToModel) => Promise<EventEntity>
	delete: (classId: string, id: string) => Promise<void>
	markRead: (classId: string) => Promise<boolean>
}
