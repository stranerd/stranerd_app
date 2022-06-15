import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { LikeToModel } from '../../data/models/like'
import { LikeEntity } from '../entities/like'
import { InteractionEntity } from '../types'

export interface ILikeRepository {
	add: (data: LikeToModel) => Promise<LikeEntity>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<LikeEntity>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<LikeEntity>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<LikeEntity>, matches: (entity: LikeEntity) => boolean) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<LikeEntity | null>
}
