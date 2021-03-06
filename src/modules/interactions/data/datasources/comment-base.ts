import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CommentFromModel, CommentToModel } from '../models/comment'

export interface CommentBaseDataSource {
	create: (data: CommentToModel) => Promise<CommentFromModel>
	update: (id: string, data: CommentToModel) => Promise<CommentFromModel>
	get: (query: QueryParams) => Promise<QueryResults<CommentFromModel>>
	listenToOne: (id: string, listener: Listeners<CommentFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<CommentFromModel>) => Promise<() => void>
	find: (id: string) => Promise<CommentFromModel | null>
	delete: (id: string) => Promise<void>
}
