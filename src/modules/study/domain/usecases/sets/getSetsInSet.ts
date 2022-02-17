import { Conditions, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetSetsInSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
