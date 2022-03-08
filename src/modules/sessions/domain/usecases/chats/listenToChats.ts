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
			where: [{ field: 'path', condition: Conditions.in, value: path[0] },
				{ field: 'path', condition: Conditions.in, value: path[1] }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (!entity.path.includes(path[0]) || !entity.path.includes(path[1])) return false
			if (date) return entity.createdAt >= date
			else return true
		})
	}
}
