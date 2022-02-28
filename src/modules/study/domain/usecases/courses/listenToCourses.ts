import { Listeners, QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'
import { CourseEntity } from '../../entities/course'

export class ListenToCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<CourseEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
