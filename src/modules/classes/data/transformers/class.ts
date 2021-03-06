import { ClassFromModel, ClassToModel } from '../models/class'
import { ClassEntity } from '../../domain/entities/class'

export class ClassTransformer {
	fromJSON (model: ClassFromModel) {
		const {
			id, name, school, description, photo, courses,
			createdAt, user, users, requests, updatedAt
		} = model
		return new ClassEntity({
			id, name, school, description, photo, courses,
			createdAt, user, users, requests, updatedAt
		})
	}

	toJSON (entity: ClassEntity): ClassToModel {
		return {
			name: entity.name,
			school: entity.school,
			description: entity.description,
			courses: entity.courses,
			photo: entity.photo
		}
	}
}
