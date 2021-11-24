import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'

export class GetPastQuestionsUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
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
