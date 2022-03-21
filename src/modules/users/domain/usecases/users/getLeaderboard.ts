import { Conditions, QueryParams } from '@modules/core'
import { IUserRepository } from '../../irepositories/iuser'
import { RankingTimes } from '../../types'

export class GetLeaderboardUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (type: RankingTimes) {
		const conditions: QueryParams = {
			where: [{ field: `account.rankings.${type}`, condition: Conditions.gt, value: 0 }],
			sort: [{ field: `account.rankings.${type}`, desc: true }],
			limit: 50
		}

		return await this.repository.get(conditions)
	}
}
