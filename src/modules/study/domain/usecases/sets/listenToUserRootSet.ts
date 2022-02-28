import { Listeners, QueryParams } from '@modules/core'
import { ISetRepository } from '../../irepositories/iset'
import { SetEntity, SetType } from '../../entities/set'

export class ListenToUserRootSetUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'parent', value: null }, { field: 'userId', value: userId }, {
				field: 'data.type',
				value: SetType.users
			}],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.userId === userId && !entity.parent && entity.data.type === SetType.users
		})
	}
}
