import { IFacultyRepository } from '../../irepositories/ifaculty'
import { FacultyFactory } from '../../factories/faculty'

export class AddFacultyUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (factory: FacultyFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
