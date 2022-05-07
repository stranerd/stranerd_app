import { IDepartmentRepository } from '../irepositories/idepartment'
import { DepartmentFactory } from '../factories/department'
import { QueryParams } from '@modules/core'

export class DepartmentsUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async add (factory: DepartmentFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: DepartmentFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async getFacultyDepartments (facultyId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'facultyId', value: facultyId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
