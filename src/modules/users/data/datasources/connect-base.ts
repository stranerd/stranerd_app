import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ConnectFromModel } from '../models/connect'

export interface ConnectBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<ConnectFromModel>>
	listenToMany: (query: QueryParams, listener: Listeners<ConnectFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ConnectFromModel>) => Promise<() => void>
	find: (id: string) => Promise<ConnectFromModel | null>
	create: (userId: string) => Promise<ConnectFromModel>
	accept: (id: string) => Promise<boolean>
	delete: (id: string) => Promise<void>
}
