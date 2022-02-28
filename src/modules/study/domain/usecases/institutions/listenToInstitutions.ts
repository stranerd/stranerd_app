import { Listeners, QueryParams } from '@modules/core'
import { IInstitutionRepository } from '../../irepositories/iinstitution'
import { InstitutionEntity } from '../../entities/institution'

export class ListenToInstitutionsUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<InstitutionEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (_) => true)
	}
}
