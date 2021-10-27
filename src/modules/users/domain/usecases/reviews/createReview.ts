import { IReviewRepository } from '../../irepositories/ireview'
import { ReviewToModel } from '../../../data/models/review'

export class CreateReviewUseCase {
	private repository: IReviewRepository

	constructor (repository: IReviewRepository) {
		this.repository = repository
	}

	async call (data: ReviewToModel) {
		return await this.repository.create(data)
	}
}
