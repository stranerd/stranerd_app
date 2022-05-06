import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetUserSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'user.id', value: userId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
