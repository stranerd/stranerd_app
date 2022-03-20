import { ICourseRepository } from '../../irepositories/icourse'
import { CourseFactory } from '../../factories/course'

export class EditCourseUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (id: string, factory: CourseFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
