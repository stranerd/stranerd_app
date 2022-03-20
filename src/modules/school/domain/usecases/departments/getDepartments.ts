import { QueryParams } from '@modules/core'
import { IDepartmentRepository } from '../../irepositories/idepartment'

export class GetDepartmentsUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
