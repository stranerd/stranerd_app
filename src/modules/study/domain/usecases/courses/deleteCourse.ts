import { ICourseRepository } from '../../irepositories/icourse'

export class DeleteCourseUseCase {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
