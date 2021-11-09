import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SessionToModel } from '../../data/models/session'
import { SessionEntity } from '../entities/session'

export interface ISessionRepository {
	add: (data: SessionToModel) => Promise<string>,
	get: (query: QueryParams) => Promise<QueryResults<SessionEntity>>
	find: (id: string) => Promise<SessionEntity | null>
	listenToOne: (id: string, listener: Listeners<SessionEntity>) => Promise<() => void>
	listenToMany: (queryParams: QueryParams, listener: Listeners<SessionEntity>, matches: (entity: SessionEntity) => boolean) => Promise<() => void>
	accept: (id: string, accepted: boolean) => Promise<void>
	cancel: (id: string) => Promise<void>
	end: (id: string) => Promise<void>
}
