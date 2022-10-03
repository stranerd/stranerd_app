import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NotificationFromModel } from '../models/notification'

export interface NotificationBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<NotificationFromModel>>
	listenToMany: (query: QueryParams, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<NotificationFromModel>) => Promise<() => void>
	find: (id: string) => Promise<NotificationFromModel | null>
	markSeen: (id: string, seen: boolean) => Promise<boolean>
}
