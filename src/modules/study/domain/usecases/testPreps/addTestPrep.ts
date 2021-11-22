import { ITestPrepRepository } from '../../irepositories/itestPrep'
import { TestPrepFactory } from '../../factories/testPrep'

export class AddTestPrepUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (factory: TestPrepFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
