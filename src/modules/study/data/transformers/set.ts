import { SetFromModel, SetToModel } from '../models/set'
import { SetEntity } from '../../domain/entities/set'

export class SetTransformer {
	fromJSON (model: SetFromModel) {
		const {
			id,
			name,
			saved,
			user,
			createdAt,
			updatedAt
		} = model
		return new SetEntity({
			id, name, saved, user, createdAt, updatedAt
		})
	}

	toJSON (entity: SetEntity): SetToModel {
		return {
			name: entity.name
		}
	}
}
