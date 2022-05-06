import { IMessageRepository } from '../irepositories/imessage'
import { MessageFactory } from '../factories/message'

export class MessagesUseCase {
	private repository: IMessageRepository

	constructor (repository: IMessageRepository) {
		this.repository = repository
	}

	async add (factory: MessageFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
