import { Listeners, QueryParams } from '@modules/core'
import { IDepartmentRepository } from '../../irepositories/idepartment'
import { DepartmentEntity } from '../../entities/department'

export class ListenToDepartmentsUseCase {
	private repository: IDepartmentRepository

	constructor (repository: IDepartmentRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<DepartmentEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
