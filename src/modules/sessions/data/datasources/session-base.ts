import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { SessionFromModel, SessionToModel } from '../models/session'

export interface SessionBaseDataSource {
	create: (data: SessionToModel) => Promise<string>
	accept: (id: string, accepted: boolean) => Promise<void>
	cancel: (id: string) => Promise<void>
	end: (id: string) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<SessionFromModel>>
	listenToOne: (id: string, listener: Listeners<SessionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<SessionFromModel>) => Promise<() => void>
	find: (id: string) => Promise<SessionFromModel | null>
}
