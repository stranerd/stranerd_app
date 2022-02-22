import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnnouncementFromModel } from '../../data/models/announcement'
import { AnnouncementEntity } from '../entities/announcement'

export interface IClassRepository {
	add: (data: AnnouncementFromModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<AnnouncementEntity>>
	listenToOne: (id: string, listener: Listeners<AnnouncementEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<AnnouncementEntity>, matches: (entity: AnnouncementEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<AnnouncementEntity | null>
	update: (id: string, data: AnnouncementFromModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
}
