import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetType } from '../../entities/set'

export class GetUserSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }, { field: 'data.type', value: SetType.users }],
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
