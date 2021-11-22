import { SetFromModel, SetToModel } from '../models/set'
import { SetEntity } from '../../domain/entities/set'

export class SetTransformer {
	fromJSON (model: SetFromModel) {
		const { id, name, saved, userId, userBio, isRoot, isPublic, createdAt, updatedAt } = model
		return new SetEntity({
			id, name, saved, userId, userBio, isRoot, isPublic, createdAt, updatedAt
		})
	}

	toJSON (entity: SetEntity): SetToModel {
		return {
			name: entity.name,
			isPublic: entity.isPublic
		}
	}
}
