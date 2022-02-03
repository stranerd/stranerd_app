import { Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity } from '@modules/study'

export class ListenToSetChildrenUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (setId: string, listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'parent', value: setId }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.parent === setId
		})
	}
}
