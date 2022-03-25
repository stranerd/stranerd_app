import { ITestPrepRepository } from '../../irepositories/itestPrep'

export class SearchTestPrepsUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['name'] }
		})
	}
}
