import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReviewRepository } from '../../irepositories/ireview'

export class GetReviewsUseCase {
	private repository: IReviewRepository

	constructor (repository: IReviewRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]
		return await this.repository.get(userId, conditions)
	}
}
