import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'
import { FlashCardEntity } from '../../domain/entities/flashCard'

export class FlashCardTransformer {
	fromJSON (model: FlashCardFromModel) {
		const { id, title, isPublic, set, tags, userId, userBio, userRoles, createdAt, updatedAt } = model
		return new FlashCardEntity({
			id, title, isPublic, set, tags, userId, userBio, userRoles, createdAt, updatedAt
		})
	}

	toJSON (entity: FlashCardEntity): FlashCardToModel {
		return {
			title: entity.title,
			isPublic: entity.isPublic,
			set: entity.set,
			tags: entity.tags
		}
	}
}
