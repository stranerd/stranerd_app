import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IReviewRepository } from '../../irepositories/ireview'
import { ReviewEntity } from '../../entities/review'

export class ListenToReviewsUseCase {
	private repository: IReviewRepository

	constructor (repository: IReviewRepository) {
		this.repository = repository
	}

	async call (userId: string, listener: Listeners<ReviewEntity>, date?: number) {
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
