import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReferralRepository } from '../../irepositories/ireferral'

export class GetReferralsUseCase {
	private repository: IReferralRepository

	constructor (repository: IReferralRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT,
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]
		return await this.repository.get(userId, conditions)
	}
}
