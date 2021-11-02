import {  QueryParams } from '@/modules/core'
import { IUserRepository } from '../../irepositories/iuser'

export class GetLeaderboardUsecase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (type: string) {
		const conditions: QueryParams = {
			sort: { field: `account.ranking.${type}`, order: 1 },
			limit: 50
		}

		return await this.repository.get(conditions)
	}
}
 