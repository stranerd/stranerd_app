import { Conditions, Listeners } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'

export class ListenToUsersInListUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'id', value: ids, condition: Conditions.in }],
			all: true
		}, listener, (entity) => ids.includes(entity.id))
	}
}
