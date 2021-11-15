import { IChatRepository } from '../../irepositories/ichat'
import { ChatFactory } from '../../factories/chat'

export class AddChatUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], factory: ChatFactory) {
		return await this.repository.add(path, await factory.toModel())
	}
}
