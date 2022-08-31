import { IReviewRepository } from '../irepositories/ireview'
import { ReviewToModel } from '../../data/models/review'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { ReviewEntity } from '../entities/review'

export class ReviewsUseCase {
	private repository: IReviewRepository

	constructor (repository: IReviewRepository) {
		this.repository = repository
	}

	async add (data: ReviewToModel) {
		return await this.repository.create(data)
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]
		return await this.repository.get(conditions)
	}

	async listen (listener: Listeners<ReviewEntity>, date?: number) {
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
