import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'

export interface AnnouncementBaseDataSource {
	create: (data: AnnouncementToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<AnnouncementFromModel>>
	listenToOne: (id: string, listener: Listeners<AnnouncementFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<AnnouncementFromModel>) => Promise<() => void>
	find: (id: string) => Promise<AnnouncementFromModel | null>
	update: (id: string, data: AnnouncementToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
}
