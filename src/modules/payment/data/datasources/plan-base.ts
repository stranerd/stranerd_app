import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { PlanFromModel } from '../models/plan'

export interface PlanBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<PlanFromModel>>
	find: (id: string) => Promise<PlanFromModel | null>
	listenToOne: (id: string, listener: Listeners<PlanFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<PlanFromModel>) => Promise<() => void>
}
