import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'
import { InteractionEntity } from '../../domain/types'

export interface CommentBaseDataSource {
	create: (data: CommentToModel) => Promise<CommentFromModel>
	update: (id: string, data: CommentToModel) => Promise<CommentFromModel>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<CommentFromModel>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<CommentFromModel>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<CommentFromModel>) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<CommentFromModel | null>
	delete: (id: string) => Promise<void>
}
