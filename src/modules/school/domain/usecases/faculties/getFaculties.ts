import { QueryParams } from '@modules/core'
import { IFacultyRepository } from '../../irepositories/ifaculty'

export class GetFacultiesUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
