import { Conditions } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { Ranks } from '../../entities/rank'

export class GetAllSessionTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			where: [{ field: 'account.score', condition: Conditions.gte, value: Ranks.Scholar.score }],
			all: true
		})
	}
}
