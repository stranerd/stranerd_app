import { Listeners, QueryParams } from '@modules/core'
import { ITestPrepRepository } from '../../irepositories/itestPrep'
import { TestPrepEntity } from '../../entities/testPrep'

export class ListenToTestPrepsUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<TestPrepEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
