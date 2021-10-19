import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<CommentEntity>>
	listenToOne: (id: string, listener: Listeners<CommentEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<CommentEntity>, matches: (entity: CommentEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<CommentEntity | null>
	update: (id: string, data: CommentToModel) => Promise<void>
}
