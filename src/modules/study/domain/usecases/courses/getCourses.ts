import { QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'

export class GetCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
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
