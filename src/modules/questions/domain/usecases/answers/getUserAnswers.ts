import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetUserAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
