import { IDepartmentRepository } from '../../irepositories/idepartment'

export class FindDepartmentUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
