import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'
import { FlashCardEntity } from '../../domain/entities/flashCard'

export class FlashCardTransformer {
	fromJSON (model: FlashCardFromModel) {
		const { id, title, set, userId, userBio, userRoles, createdAt, updatedAt } = model
		return new FlashCardEntity({
			id, title, set, userId, userBio, userRoles, createdAt, updatedAt
		})
	}

	toJSON (entity: FlashCardEntity): FlashCardToModel {
		return {
			title: entity.title,
			set: entity.set
		}
	}
}
