import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { PlanEntity } from '../entities/plan'

export interface IPlanRepository {
	get: (query: QueryParams) => Promise<QueryResults<PlanEntity>>
	find: (id: string) => Promise<PlanEntity | null>
	listenToOne: (id: string, listener: Listeners<PlanEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<PlanEntity>, matches: (entity: PlanEntity) => boolean) => Promise<() => void>
}
