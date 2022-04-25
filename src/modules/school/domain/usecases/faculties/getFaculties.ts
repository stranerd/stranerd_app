import { QueryParams } from '@modules/core'
import { IFacultyRepository } from '../../irepositories/ifaculty'

export class GetFacultiesUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (institutionId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'institutionId', value: institutionId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
