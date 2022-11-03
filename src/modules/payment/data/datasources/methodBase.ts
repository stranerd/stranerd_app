import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { MethodFromModel } from '../models/method'

export interface MethodBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<MethodFromModel>>
	find: (id: string) => Promise<MethodFromModel | null>
	makePrimary: (id: string) => Promise<MethodFromModel>
	delete: (id: string) => Promise<void>
	listenToOne: (id: string, listener: Listeners<MethodFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<MethodFromModel>) => Promise<() => void>
}
