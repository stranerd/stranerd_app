import { Conditions, QueryParams } from '@modules/core'
import { ITestPrepRepository } from '../../irepositories/itestPrep'

export class GetTestPrepsInSetUseCase {
	private repository: ITestPrepRepository

	constructor (repository: ITestPrepRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
