import { QueryParams } from '@/modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { RankingTimes } from '@/modules/users/domain/entities/user'

export class GetLeaderboardUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (type: RankingTimes) {
		const conditions: QueryParams = {
			sort: { field: `account.ranking.${type}`, order: -1 },
			limit: 50
		}

		return await this.repository.get(conditions)
	}
}
 