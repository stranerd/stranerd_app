import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'

export interface AnnouncementBaseDataSource {
	create: (classId: string, data: AnnouncementToModel) => Promise<AnnouncementFromModel>
	update: (classId: string, id: string, data: AnnouncementToModel) => Promise<AnnouncementFromModel>
	get: (classId: string, query: QueryParams) => Promise<QueryResults<AnnouncementFromModel>>
	listenToOne: (classId: string, id: string, listener: Listeners<AnnouncementFromModel>) => Promise<() => void>
	listenToMany: (classId: string, query: QueryParams, listener: Listeners<AnnouncementFromModel>) => Promise<() => void>
	find: (classId: string, id: string) => Promise<AnnouncementFromModel | null>
	delete: (classId: string, id: string) => Promise<void>
	markRead: (classId: string) => Promise<boolean>
}
