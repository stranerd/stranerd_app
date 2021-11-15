import { Conditions, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { IChatRepository } from '../../irepositories/ichat'

export class GetChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async call (path: [string, string], date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: CHAT_PAGINATION_LIMIT
		}

		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(path, conditions)
	}
}
