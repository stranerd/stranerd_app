import { Conditions, Listeners } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { UserEntity } from '../../entities/user'
import { Ranks } from '../../entities/rank'

export class ListenToAllSessionTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'account.score', condition: Conditions.gte, value: Ranks.Scholar.score }],
			all: true
		}, listener, (entity) => entity.score >= Ranks.Scholar.score)
	}
}
