import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { VideoCommentFromModel, VideoCommentToModel } from '../models/videoComment'

export interface VideoCommentBaseDataSource {
	create: (data: VideoCommentToModel) => Promise<string>
	update: (id: string, data: VideoCommentToModel) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<VideoCommentFromModel>>
	listenToOne: (id: string, listener: Listeners<VideoCommentFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<VideoCommentFromModel>) => Promise<() => void>
	find: (id: string) => Promise<VideoCommentFromModel | null>
	delete: (id: string) => Promise<void>
}
