import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnnouncementToModel } from '../../data/models/announcement'
import { AnnouncementEntity } from '../entities/announcement'

export interface IAnnouncementRepository {
	add: (classId: string, data: AnnouncementToModel) => Promise<AnnouncementEntity>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<AnnouncementEntity>>
	listenToOne: (classId: string, id: string, listener: Listeners<AnnouncementEntity>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<AnnouncementEntity>, matches: (entity: AnnouncementEntity) => boolean) => Promise<() => void>
	find: (classId: string, id: string) => Promise<AnnouncementEntity | null>
	update: (classId: string, id: string, data: AnnouncementToModel) => Promise<AnnouncementEntity>
	delete: (classId: string, id: string) => Promise<void>
}
