import { ITestRepository } from '../../irepositories/itest'
import { TestType } from '@modules/study/domain/entities/test'

export class AddTestUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (prepId: string, type: TestType) {
		return await this.repository.add({ prepId, type })
	}
}
