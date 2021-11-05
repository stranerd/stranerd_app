import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class ChatApiDataSource implements ChatBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/sessions/chats')
	}

	async create (_: [string, string], data: ChatToModel) {
		const chat = await this.stranerdClient.post<ChatToModel, ChatFromModel>('/', data)
		return chat.id
	}

	async find (_: [string, string], id: string) {
		return await this.stranerdClient.get<{}, ChatFromModel | null>(`/${id}`, {})
	}

	async get (_: [string, string], query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatFromModel>>('/', query)
	}

	async listenToMany (_: [string, string], query: QueryParams, listeners: Listeners<ChatFromModel>) {
		const listener = listenOnSocket('chats', listeners)
		const models = await this.get(_, query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async listenToOne (_: [string, string], id: string, listeners: Listeners<ChatFromModel>) {
		const listener = listenOnSocket(`chats/${id}`, listeners)
		const model = await this.find(_, id)
		if (model) await listeners.updated(model)
		return listener
	}

	async markRead (_: [string, string], chatId: string, to: string) {
		return await this.stranerdClient.put<any, any>(`/${chatId}/read`, { to })
	}
}
