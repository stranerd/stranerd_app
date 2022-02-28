import { ClassFromModel, ClassToModel } from '../models/class'
import { ClassEntity } from '../../domain/entities/class'

export class ClassTransformer {
	fromJSON (model: ClassFromModel) {
		const {
			id, name, description, photo,
			createdAt, userId, userBio, userRoles,
			users, requests, updatedAt
		} = model
		return new ClassEntity({
			id, name, description, photo,
			createdAt, userId, userBio, userRoles,
			users, requests, updatedAt
		})
	}

	toJSON (entity: ClassEntity): ClassToModel {
		return {
			name: entity.name,
			description: entity.description,
			photo: entity.photo
		}
	}
}
