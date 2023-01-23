import { IConversationRepository } from '../irepositories/iconversation'

export class ConversationsUseCase {
	private repository: IConversationRepository

	constructor (repository: IConversationRepository) {
		this.repository = repository
	}

	async converse (data: string[]) {
		return await this.repository.converse(data)
	}
}
