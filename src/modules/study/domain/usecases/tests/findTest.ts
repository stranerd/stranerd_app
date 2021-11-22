import { ITestRepository } from '../../irepositories/itest'

export class FindTestUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
