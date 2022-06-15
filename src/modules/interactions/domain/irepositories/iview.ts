import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ViewToModel } from '../../data/models/view'
import { ViewEntity } from '../entities/view'

export interface IViewRepository {
	add: (data: ViewToModel) => Promise<ViewEntity>
	get: (query: QueryParams) => Promise<QueryResults<ViewEntity>>
	listenToOne: (id: string, listener: Listeners<ViewEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ViewEntity>, matches: (entity: ViewEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<ViewEntity | null>
}
