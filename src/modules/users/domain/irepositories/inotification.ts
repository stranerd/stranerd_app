import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NotificationEntity } from '../entities/notification'

export interface INotificationRepository {
	find: (id: string) => Promise<NotificationEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<NotificationEntity>>
	listenToOne: (id: string, listener: Listeners<NotificationEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<NotificationEntity>, matches: (entity: NotificationEntity) => boolean) => Promise<() => void>
	markSeen: (id: string, seen: boolean) => Promise<boolean>,
}
