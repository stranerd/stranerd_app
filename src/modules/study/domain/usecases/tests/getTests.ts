import { QueryParams } from '@modules/core'
import { ITestRepository } from '../../irepositories/itest'

export class GetTestsUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
