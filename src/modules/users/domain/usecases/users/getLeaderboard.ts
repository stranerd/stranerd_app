<<<<<<< HEAD
import { QueryParams } from '@modules/core'
=======
import { Conditions, QueryParams } from '@modules/core'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import { IUserRepository } from '../../irepositories/iuser'
import { RankingTimes } from '@modules/users/domain/entities/user'

export class GetLeaderboardUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (type: RankingTimes) {
		const conditions: QueryParams = {
<<<<<<< HEAD
=======
			where: [{ field: `account.rankings.${type}`, condition: Conditions.gt, value: 0 }],
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			sort: { field: `account.rankings.${type}`, order: -1 },
			limit: 50
		}

		return await this.repository.get(conditions)
	}
}
