import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NotificationFromModel } from '../models/notification'

export interface NotificationBaseDataSource {
	get: (user: string, query: QueryParams) => Promise<QueryResults<NotificationFromModel>>
	listenToMany: (user: string, query: QueryParams, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	listenToOne: (user: string, id: string, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	find: (user: string, id: string) => Promise<NotificationFromModel | null>
	markSeen: (userId: string, id: string, seen: boolean) => Promise<boolean>
}
