import { IDepartmentRepository } from '../../irepositories/idepartment'

export class DeleteDepartmentUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
