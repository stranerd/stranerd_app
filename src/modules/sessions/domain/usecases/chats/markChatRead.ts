import { IChatRepository } from '../../irepositories/ichat'

export class MarkChatReadUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], id: string) {
		return await this.repository.markRead(path, id, path[1])
	}
}
