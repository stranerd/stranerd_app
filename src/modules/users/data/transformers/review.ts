import { ReviewFromModel, ReviewToModel } from '../models/review'
import { ReviewEntity } from '../../domain/entities/review'

export class ReviewTransformer {
	fromJSON (model: ReviewFromModel) {
		const { id, review, rating, tutorId, userId, userBio, createdAt, updatedAt } = model
		return new ReviewEntity({
			id, review, rating, tutorId, userId, userBio, createdAt, updatedAt
		})
	}

	toJSON (entity: ReviewEntity): ReviewToModel {
		return {
			review: entity.review,
			rating: entity.rating,
			tutorId: entity.tutorId
		}
	}
}
