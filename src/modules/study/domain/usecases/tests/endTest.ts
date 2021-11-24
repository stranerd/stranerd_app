import { ITestRepository } from '../../irepositories/itest'

export class EndTestUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.end(id)
	}
}
