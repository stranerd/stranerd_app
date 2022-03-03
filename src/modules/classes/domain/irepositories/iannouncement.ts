import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnnouncementToModel } from '../../data/models/announcement'
import { AnnouncementEntity } from '../entities/announcement'

export interface IAnnouncementRepository {
	add: (data: AnnouncementToModel) => Promise<AnnouncementEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnnouncementEntity>>
	listenToOne: (id: string, listener: Listeners<AnnouncementEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<AnnouncementEntity>, matches: (entity: AnnouncementEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<AnnouncementEntity | null>
	update: (id: string, data: AnnouncementToModel) => Promise<AnnouncementEntity>
	delete: (id: string) => Promise<void>
}
