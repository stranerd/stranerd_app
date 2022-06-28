import { IChatRepository } from '../irepositories/ichat'
import { ChatFactory } from '../factories/chat'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { ChatEntity } from '../entities/chat'

export class ChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async add (factory: ChatFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async markRead (to: string) {
		return await this.repository.markRead(to)
	}

	async get (path: [string, string], date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'from.id', condition: Conditions.in, value: path },
				{ field: 'to', condition: Conditions.in, value: path }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async listen (path: [string, string], listener: Listeners<ChatEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'from.id', condition: Conditions.in, value: path },
				{ field: 'to', condition: Conditions.in, value: path }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (!path.includes(entity.from.id) || !path.includes(entity.to)) return false
			if (date) return entity.createdAt >= date
			else return true
		})
	}
}
