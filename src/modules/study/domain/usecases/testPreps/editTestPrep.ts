import { ITestPrepRepository } from '../../irepositories/itestPrep'
import { TestPrepFactory } from '../../factories/testPrep'

export class EditTestPrepUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (id: string, factory: TestPrepFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
