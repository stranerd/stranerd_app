import { Conditions, QueryParams } from '@modules/core'
import { IVideoRepository } from '../../irepositories/ivideo'
import { PAGINATION_LIMIT } from '@utils/constants'

export class GetUserVideosUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
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
