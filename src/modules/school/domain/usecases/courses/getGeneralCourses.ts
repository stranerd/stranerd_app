import { QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'

export class GetGeneralCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (institutionId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'institutionId', value: institutionId }, { field: 'facultyId', value: null }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
