import { ITestRepository } from '../../irepositories/itest'
import { TestToModel } from '../../../data/models/test'

export class AddTestUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (data: TestToModel) {
		return await this.repository.add(data)
	}
}
