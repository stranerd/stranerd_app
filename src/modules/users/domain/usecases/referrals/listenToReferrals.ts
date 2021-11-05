import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IReferralRepository } from '../../irepositories/ireferral'
import { ReferralEntity } from '../../entities/referral'

export class ListenToReferralsUseCase {
	private repository: IReferralRepository

	constructor (repository: IReferralRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ReferralEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(userId, conditions, listener, (entity) => {
			if (entity.userId !== userId) return false
			if (date) return entity.createdAt > date
			else return true
		})
	}
}
