import { HttpClient, Listeners, listenOnSocket, QueryParams, QueryResults } from '@modules/core'
import { apiBases } from '@utils/environment'
import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatBaseDataSource } from './chat-base'

export class ChatApiDataSource implements ChatBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBases.STRANERD + '/sessions/chats')
	}

	async create (data: ChatToModel) {
		return await this.stranerdClient.post<ChatToModel, ChatFromModel>('/', data)
	}

	async find (id: string) {
		return await this.stranerdClient.get<any, ChatFromModel | null>(`/${id}`, {})
	}

	async get (query: QueryParams) {
		return await this.stranerdClient.get<QueryParams, QueryResults<ChatFromModel>>('/', query)
	}

	async listenToMany (query: QueryParams, listeners: Listeners<ChatFromModel>) {
		const listener = listenOnSocket('sessions/chats', listeners)
		const models = await this.get(query)
		await Promise.all(models.results.map(listeners.updated))
		return listener
	}

	async listenToOne (id: string, listeners: Listeners<ChatFromModel>) {
		const listener = listenOnSocket(`sessions/chats/${id}`, listeners)
		const model = await this.find(id)
		if (model) await listeners.updated(model)
		return listener
	}

	async markRead (chatId: string, to: string) {
		return await this.stranerdClient.put<any, any>(`/${chatId}/read`, { to })
	}
}
