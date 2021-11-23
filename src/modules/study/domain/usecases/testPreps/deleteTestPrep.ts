import { ITestPrepRepository } from '../../irepositories/itestPrep'

export class DeleteTestPrepUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
