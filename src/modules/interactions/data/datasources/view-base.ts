import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ViewFromModel, ViewToModel } from '../models/view'
import { InteractionEntity } from '../../domain/types'

export interface ViewBaseDataSource {
	create: (data: ViewToModel) => Promise<ViewFromModel>
	get: (entity: InteractionEntity, query: QueryParams) => Promise<QueryResults<ViewFromModel>>
	listenToOne: (entity: InteractionEntity, id: string, listener: Listeners<ViewFromModel>) => Promise<() => void>
	listenToMany: (entity: InteractionEntity, query: QueryParams, listener: Listeners<ViewFromModel>) => Promise<() => void>
	find: (entity: InteractionEntity, id: string) => Promise<ViewFromModel | null>
}
