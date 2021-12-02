import { Conditions, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { PAGINATION_LIMIT } from '@utils/constants'

export class GetFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }, { field: 'isPublic', value: true }],
			whereType: 'or',
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
