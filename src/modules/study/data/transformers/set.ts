import { SetFromModel, SetToModel } from '../models/set'
import { SetEntity } from '../../domain/entities/set'

export class SetTransformer {
	fromJSON (model: SetFromModel) {
		const {
			id,
			name,
			saved,
			data,
			children,
			userId,
			userBio,
			userRoles,
			parent,
			isPublic,
			createdAt,
			updatedAt
		} = model
		return new SetEntity({
			id, name, saved, children, data, userId, userBio, userRoles, parent, isPublic, createdAt, updatedAt
		})
	}

	toJSON (entity: SetEntity): SetToModel {
		return {
			name: entity.name,
			parent: entity.parent,
			isPublic: entity.isPublic,
			data: entity.data
		}
	}
}
