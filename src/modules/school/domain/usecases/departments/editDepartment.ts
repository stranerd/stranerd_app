import { IDepartmentRepository } from '../../irepositories/idepartment'
import { DepartmentFactory } from '../../factories/department'

export class EditDepartmentUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call (id: string, factory: DepartmentFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
