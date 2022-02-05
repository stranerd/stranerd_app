import { Conditions, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { PAGINATION_LIMIT } from '@utils/constants'

export class GetFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(conditions)
	}
}
