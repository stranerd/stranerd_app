import { Listeners } from '@modules/core'
import { ITestRepository } from '../../irepositories/itest'
import { TestEntity } from '../../entities/test'

export class ListenToTestUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<TestEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
