import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IChatRepository } from '../../irepositories/ichat'
import { ChatEntity } from '../../entities/chat'

export class ListenToChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], listener: Listeners<ChatEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(path, conditions, listener, (entity) => {
			if (!entity.path.includes(path[0]) || !entity.path.includes(path[1])) return false
			if (date) return entity.createdAt > date
			else return true
		})
	}
}
