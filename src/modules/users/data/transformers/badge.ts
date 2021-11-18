import { BadgeFromModel, BadgeToModel } from '../models/badge'
import { BadgeEntity } from '../../domain/entities/badge'

export class BadgeTransformer {
	fromJSON (model: BadgeFromModel) {
		const { id, userId, data, badges, allBadges, createdAt, updatedAt } = model
		return new BadgeEntity({
			id, userId, data,
			badges, allBadges,
			createdAt, updatedAt
		})
	}

	toJSON (entity: BadgeEntity): BadgeToModel {
		return {
			data: entity.data,
			badges: entity.badges
		}
	}
}
