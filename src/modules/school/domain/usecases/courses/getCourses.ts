import { QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'

export class GetCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (departmentId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'departmentId', value: departmentId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
