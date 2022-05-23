import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { EventFromModel, EventToModel } from '../models/event'

export interface EventBaseDataSource {
	create: (classId: string, data: EventToModel) => Promise<EventFromModel>
	update: (classId: string, id: string, data: EventToModel) => Promise<EventFromModel>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<EventFromModel>>
	listenToOne: (classId: string, id: string, listener: Listeners<EventFromModel>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<EventFromModel>) => Promise<() => void>
	find: (classId: string, id: string) => Promise<EventFromModel | null>
	delete: (classId: string, id: string) => Promise<void>
	markRead: (classId: string) => Promise<boolean>
}
