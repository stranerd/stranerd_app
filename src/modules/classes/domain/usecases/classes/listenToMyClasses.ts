import { Listeners, QueryParams } from '@modules/core'
import { ClassEntity } from '../../entities/class'
import { IClassRepository } from '../../irepositories/iclass'

export class ListenToMyClassesUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ClassEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'users.members', value: userId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.users.members.includes(userId)
		})
	}
}
