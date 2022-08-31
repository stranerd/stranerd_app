import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ConnectEntity } from '../entities/connect'

export interface IConnectRepository {
	find: (id: string) => Promise<ConnectEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ConnectEntity>>
	listenToOne: (id: string, listener: Listeners<ConnectEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ConnectEntity>, matches: (entity: ConnectEntity) => boolean) => Promise<() => void>
	create: (userId: string) => Promise<ConnectEntity>
	accept: (id: string, accept: boolean) => Promise<boolean>
	delete: (id: string) => Promise<void>
}
