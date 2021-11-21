import { Conditions, Listeners, QueryParams } from '@modules/core'
import { ICourseRepository } from '../../irepositories/icourse'
import { CourseEntity } from '../../entities/course'

export class ListenToCoursesUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<CourseEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt > date
			return true
		})
	}
}
