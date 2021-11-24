import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { VideoEntity } from '../entities/video'
import { VideoToModel } from '../../data/models/video'

export interface IVideoRepository {
	add: (data: VideoToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<VideoEntity>>
	listenToOne: (id: string, listener: Listeners<VideoEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<VideoEntity>, matches: (entity: VideoEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<VideoEntity | null>
	update: (id: string, data: VideoToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
