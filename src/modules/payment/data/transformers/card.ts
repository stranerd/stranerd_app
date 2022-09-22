import { CardFromModel } from '../models/card'
import { CardEntity } from '../../domain/entities/card'

export class CardTransformer {
	fromJSON (model: CardFromModel) {
		const {
			id, last4Digits, country, type,
			token, expiredAt, userId, primary, expired,
			createdAt, updatedAt
		} = model
		return new CardEntity({
			id, last4Digits, country, type,
			token, expiredAt, userId, primary, expired,
			createdAt, updatedAt
		})
	}

	toJSON (entity: CardEntity) {
		return {}
	}
}
