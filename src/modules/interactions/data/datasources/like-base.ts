import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { LikeFromModel, LikeToModel } from '../models/like'
import { InteractionEntity } from '../../domain/types'

export interface LikeBaseDataSource {
	create: (data: LikeToModel) => Promise<LikeFromModel>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<LikeFromModel>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<LikeFromModel>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<LikeFromModel>) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<LikeFromModel | null>
}
