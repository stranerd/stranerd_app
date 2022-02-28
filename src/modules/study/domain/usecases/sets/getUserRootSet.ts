import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetType } from '../../entities/set'

export class GetUserRootSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'parent', value: '' }, { field: 'userId', value: userId }, {
				field: 'data.type',
				value: SetType.users
			}],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
