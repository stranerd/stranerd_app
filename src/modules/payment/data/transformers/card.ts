import { CardFromModel } from '../models/card'
import { CardEntity } from '../../domain/entities/card'

export class CardTransformer {
	fromJSON (model: CardFromModel) {
		const {
			id, first6Digits, last4Digits, issuer, country, type,
			token, expiredAt, userId, email, primary, expired,
			createdAt, updatedAt
		} = model
		return new CardEntity({
			id, first6Digits, last4Digits, issuer, country, type,
			token, expiredAt, userId, email, primary, expired,
			createdAt, updatedAt
		})
	}

	toJSON (entity: CardEntity) {
		return {}
	}
}
