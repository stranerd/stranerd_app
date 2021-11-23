import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }, { field: 'isPublic', value: true }],
			whereType: 'or',
			sort: { field: 'createdAt', order: -1 }
		}

		return await this.repository.get(conditions)
	}
}
