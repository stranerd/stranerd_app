import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { VideoFromModel, VideoToModel } from '../models/video'

export interface VideoBaseDataSource {
	create: (data: VideoToModel) => Promise<VideoFromModel>
	update: (id: string, data: VideoToModel) => Promise<VideoFromModel>
	get: (query: QueryParams) => Promise<QueryResults<VideoFromModel>>
	listenToOne: (id: string, listener: Listeners<VideoFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<VideoFromModel>) => Promise<() => void>
	find: (id: string) => Promise<VideoFromModel | null>
	delete: (id: string) => Promise<void>
}
