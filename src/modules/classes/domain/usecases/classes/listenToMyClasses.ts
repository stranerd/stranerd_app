import { Listeners, QueryParams } from '@modules/core'
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
			whereType: 'or',
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.users.members.includes(userId)
		})
	}
}
