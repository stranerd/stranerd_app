import { Listeners, QueryParams } from '@modules/core'
import { IFacultyRepository } from '../../irepositories/ifaculty'
import { FacultyEntity } from '../../entities/faculty'

export class ListenToFacultiesUseCase {
	private repository: IFacultyRepository

	constructor (repository: IFacultyRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<FacultyEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
