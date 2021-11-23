import { QueryParams } from '@modules/core'
import { IInstitutionRepository } from '../../irepositories/iinstitution'

export class GetInstitutionsUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
