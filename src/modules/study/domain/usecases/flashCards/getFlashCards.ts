import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class GetFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			limit: PAGINATION_LIMIT,
			where: [{ field: 'userId', value: userId }, { field: 'isPublic', value: true }],
			whereType: 'or',
			sort: { field: 'createdAt', order: -1 }
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
