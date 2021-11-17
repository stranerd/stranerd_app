import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IInstitutionRepository } from '../../irepositories/iinstitution'
import { InstitutionEntity } from '../../entities/institution'

export class ListenToInstitutionsUseCase {
	private repository: IInstitutionRepository

	constructor (repository: IInstitutionRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<InstitutionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt > date
			return true
		})
	}
}
