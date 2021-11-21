import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { VideoCommentEntity } from '../entities/videoComment'
import { VideoCommentToModel } from '../../data/models/videoComment'

export interface IVideoCommentRepository {
	add: (data: VideoCommentToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<VideoCommentEntity>>
	listenToOne: (id: string, listener: Listeners<VideoCommentEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<VideoCommentEntity>, matches: (entity: VideoCommentEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<VideoCommentEntity | null>
	update: (id: string, data: VideoCommentToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
