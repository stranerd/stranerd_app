import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CommentToModel } from '../../data/models/comment'
import { CommentEntity } from '../entities/comment'
import { InteractionEntity } from '../types'

export interface ICommentRepository {
	add: (data: CommentToModel) => Promise<CommentEntity>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<CommentEntity>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<CommentEntity>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<CommentEntity>, matches: (entity: CommentEntity) => boolean) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<CommentEntity | null>
	update: (id: string, data: CommentToModel) => Promise<CommentEntity>
	delete: (id: string) => Promise<void>
}
