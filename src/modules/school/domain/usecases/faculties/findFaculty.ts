import { IFacultyRepository } from '../../irepositories/ifaculty'

export class FindFacultyUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
