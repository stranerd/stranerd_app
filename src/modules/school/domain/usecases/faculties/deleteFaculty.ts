import { IFacultyRepository } from '../../irepositories/ifaculty'

export class DeleteFacultyUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
