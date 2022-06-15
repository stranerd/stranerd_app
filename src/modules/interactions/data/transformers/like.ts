import { LikeFromModel, LikeToModel } from '../models/like'
import { LikeEntity } from '../../domain/entities/like'

export class LikeTransformer {
	fromJSON (model: LikeFromModel) {
		const { id, value, entity, user, createdAt, updatedAt } = model
		return new LikeEntity({
			id, value, entity, user, createdAt, updatedAt
		})
	}

	toJSON (entity: LikeEntity): LikeToModel {
		return {
			value: entity.value,
			entity: entity.entity
		}
	}
}
