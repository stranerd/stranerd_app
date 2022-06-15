import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ViewToModel } from '../../data/models/view'
import { ViewEntity } from '../entities/view'
import { InteractionEntity } from '../types'

export interface IViewRepository {
	add: (data: ViewToModel) => Promise<ViewEntity>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<ViewEntity>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<ViewEntity>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<ViewEntity>, matches: (entity: ViewEntity) => boolean) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<ViewEntity | null>
}
