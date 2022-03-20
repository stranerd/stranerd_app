import { IDepartmentRepository } from '../../irepositories/idepartment'
import { DepartmentFactory } from '../../factories/department'

export class AddDepartmentUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call (factory: DepartmentFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
