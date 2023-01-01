import { HttpClient } from '@modules/core'
import { apiBase } from '@utils/environment'
import { ConversationBaseDataSource } from './conversationBase'

export class ConversationApiDataSource implements ConversationBaseDataSource {
	private stranerdClient: HttpClient

	constructor () {
		this.stranerdClient = new HttpClient(apiBase + '/questions/conversations')
	}

	async converse (messages: string[]) {
		return await this.stranerdClient.post<{ messages: string[] }, string[]>('/converse', { messages })
	}
}
