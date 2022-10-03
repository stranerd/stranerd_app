import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { LikeFromModel, LikeToModel } from '../models/like'

export interface LikeBaseDataSource {
	create: (data: LikeToModel) => Promise<LikeFromModel>
	get: (query: QueryParams) => Promise<QueryResults<LikeFromModel>>
	listenToOne: (id: string, listener: Listeners<LikeFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<LikeFromModel>) => Promise<() => void>
	find: (id: string) => Promise<LikeFromModel | null>
}
