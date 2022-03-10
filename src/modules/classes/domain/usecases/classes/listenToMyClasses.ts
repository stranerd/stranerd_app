import { Listeners, QueryKeys, QueryParams } from '@modules/core'
import { ClassEntity, ClassUsers } from '../../entities/class'
import { IClassRepository } from '../../irepositories/iclass'

export class ListenToMyClassesUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ClassEntity>) {
		const conditions: QueryParams = {
			where: [{ field: `users.${ClassUsers.members}`, value: userId }, { field: 'requests', value: 'userId' }],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.users[ClassUsers.members].includes(userId)
		})
	}
}
