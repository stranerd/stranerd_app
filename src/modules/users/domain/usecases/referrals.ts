import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReferralRepository } from '../irepositories/ireferral'
import { ReferralEntity } from '../entities/referral'

export class ReferralsUseCase {
	private repository: IReferralRepository

	constructor (repository: IReferralRepository) {
		this.repository = repository
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT,
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]
		return await this.repository.get(conditions)
	}

	async listen (listener: Listeners<ReferralEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			else return true
		})
	}
}
