import { Conditions, Listeners, QueryParams } from '@modules/core'
import { ITestPrepRepository } from '../../irepositories/itestPrep'
import { TestPrepEntity } from '../../entities/testPrep'

export class ListenToTestPrepsInSetUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<TestPrepEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}
}
