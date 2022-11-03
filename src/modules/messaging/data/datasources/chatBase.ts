import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatFromModel, ChatToModel } from '../models/chat'

export interface ChatBaseDataSource {
	create: (data: ChatToModel) => Promise<ChatFromModel>
	get: (query: QueryParams) => Promise<QueryResults<ChatFromModel>>
	find: (id: string) => Promise<ChatFromModel | null>
	listenToMany: (query: QueryParams, listener: Listeners<ChatFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ChatFromModel>) => Promise<() => void>
	markRead: (to: string) => Promise<void>
}
