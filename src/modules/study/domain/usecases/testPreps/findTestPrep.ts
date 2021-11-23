import { ITestPrepRepository } from '../../irepositories/itestPrep'

export class FindTestPrepUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
