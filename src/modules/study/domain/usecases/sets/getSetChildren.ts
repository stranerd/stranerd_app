import { QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'

export class GetSetChildrenUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (setId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'parent', value: setId }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
