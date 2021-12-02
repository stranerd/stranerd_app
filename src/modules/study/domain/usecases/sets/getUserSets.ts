import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetUserSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }],
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
