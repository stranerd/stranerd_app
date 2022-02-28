import { IChatRepository } from '../../irepositories/ichat'
import { ChatFactory } from '../../factories/chat'

export class AddChatUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (factory: ChatFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
