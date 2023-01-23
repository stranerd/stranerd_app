import { IConversationRepository } from '../../domain/irepositories/iconversation'
import { ConversationBaseDataSource } from '../datasources/conversationBase'

export class ConversationRepository implements IConversationRepository {
	private dataSource: ConversationBaseDataSource

	constructor (dataSource: ConversationBaseDataSource) {
		this.dataSource = dataSource
	}

	async converse (data: string[]) {
		return await this.dataSource.converse(data)
	}
}
