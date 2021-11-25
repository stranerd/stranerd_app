import { Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity } from '../../entities/set'

export class ListenToSetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }, { field: 'isPublic', value: true }],
			whereType: 'or',
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.userId === userId || entity.isPublic
		})
	}
}
