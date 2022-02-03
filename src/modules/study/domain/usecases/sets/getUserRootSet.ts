import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetUserRootSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'parent', value: null }, { field: 'userId', value: userId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
