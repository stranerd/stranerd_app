import { Conditions, Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity } from '../../entities/set'

export class ListenToSetsInSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}
}
