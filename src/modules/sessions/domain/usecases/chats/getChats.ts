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
			where: [{ field: 'from', condition: Conditions.in, value: path },
				{ field: 'to', condition: Conditions.in, value: path }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
