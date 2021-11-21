import { Conditions, Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity } from '../../entities/set'

export class ListenToSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<SetEntity>, date?: number) {
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
