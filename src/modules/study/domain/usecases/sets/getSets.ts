import { Conditions, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { PAGINATION_LIMIT } from '@utils/constants'

export class GetSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'isPublic', value: true }],
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
