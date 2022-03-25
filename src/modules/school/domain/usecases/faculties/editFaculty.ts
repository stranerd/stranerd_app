import { IFacultyRepository } from '../../irepositories/ifaculty'
import { FacultyFactory } from '../../factories/faculty'

export class EditFacultyUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (id: string, factory: FacultyFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
