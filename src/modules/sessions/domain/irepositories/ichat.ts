import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ChatToModel } from '../../data/models/chat'
import { ChatEntity } from '../entities/chat'

export interface IChatRepository {
	add: (data: ChatToModel) => Promise<string>,
	get: (query: QueryParams) => Promise<QueryResults<ChatEntity>>
	find: (id: string) => Promise<ChatEntity | null>
	listenToOne: (id: string, listener: Listeners<ChatEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<ChatEntity>, matches: (entity: ChatEntity) => boolean) => Promise<() => void>
	markRead: (chatId: string, to: string) => Promise<void>
}
