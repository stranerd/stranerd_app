import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'
import { FlashCardEntity } from '../../domain/entities/flashCard'

export class FlashCardTransformer {
	fromJSON (model: FlashCardFromModel) {
		const { id, set, tags, userId, userBio, createdAt, updatedAt } = model
		return new FlashCardEntity({
			id, set, tags, userId, userBio, createdAt, updatedAt
		})
	}

	toJSON (entity: FlashCardEntity): FlashCardToModel {
		return {
			set: entity.set,
			tags: entity.tags
		}
	}
}
