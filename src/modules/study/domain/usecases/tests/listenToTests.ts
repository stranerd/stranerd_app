import { Listeners, QueryParams } from '@modules/core'
import { ITestRepository } from '../../irepositories/itest'
import { TestEntity } from '../../entities/test'

export class ListenToTestsUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<TestEntity>) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
