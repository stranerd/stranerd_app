import { Conditions, QueryParams } from '@modules/core'
import { INoteRepository } from '../../irepositories/inote'
import { PAGINATION_LIMIT } from '@utils/constants'

export class GetUserNotesUseCase {
	private repository: INoteRepository

	constructor (repository: INoteRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT,
			where: [{ field: 'userId', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
