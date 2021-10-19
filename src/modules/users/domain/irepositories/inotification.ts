import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { NotificationEntity } from '../entities/notification'

export interface INotificationRepository {
	find: (userId: string, id: string) => Promise<NotificationEntity | null>
	get: (userId: string, query: QueryParams) => Promise<QueryResults<NotificationEntity>>
	listenToOne: (userId: string, id: string, listener: Listeners<NotificationEntity>) => Promise<() => void>
	listenToMany: (userId: string, query: QueryParams, listener: Listeners<NotificationEntity>, matches: (entity: NotificationEntity) => boolean) => Promise<() => void>
	markSeen: (userId: string, id: string, seen: boolean) => Promise<boolean>,
}
