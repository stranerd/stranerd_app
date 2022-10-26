import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { MethodEntity } from '../entities/method'

export interface IMethodRepository {
	get: (query: QueryParams) => Promise<QueryResults<MethodEntity>>
	find: (id: string) => Promise<MethodEntity | null>
	listenToOne: (id: string, listener: Listeners<MethodEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<MethodEntity>, matches: (entity: MethodEntity) => boolean) => Promise<() => void>
	makePrimary: (id: string) => Promise<MethodEntity>
	delete: (id: string) => Promise<void>
}
