import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatMetaFromModel } from '../models/chatMeta'

export interface ChatMetaBaseDataSource {
	find: (id: string) => Promise<ChatMetaFromModel | null>
	get: (query: QueryParams) => Promise<QueryResults<ChatMetaFromModel>>
	listenToOne: (id: string, listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ChatMetaFromModel>) => Promise<() => void>
}
