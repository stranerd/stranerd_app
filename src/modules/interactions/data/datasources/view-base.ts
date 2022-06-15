import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ViewFromModel, ViewToModel } from '../models/view'
import { InteractionEntity } from '../../domain/types'

export interface ViewBaseDataSource {
	create: (data: ViewToModel) => Promise<ViewFromModel>
	get: (query: QueryParams) => Promise<QueryResults<ViewFromModel>>
	listenToOne: (id: string, listener: Listeners<ViewFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ViewFromModel>) => Promise<() => void>
	find: (id: string) => Promise<ViewFromModel | null>
}
