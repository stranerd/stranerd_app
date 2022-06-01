import { SchemeFromModel, SchemeToModel } from '../models/scheme'
import { SchemeEntity } from '../../domain/entities/scheme'

export class SchemeTransformer {
	fromJSON (model: SchemeFromModel) {
		const { id, title, topic, start, end, user, users, createdAt, classId, readAt, updatedAt } = model
		return new SchemeEntity({
			id, title, topic, start, end, user, users, classId, readAt, createdAt, updatedAt
		})
	}

	toJSON (entity: SchemeEntity): SchemeToModel {
		return {
			title: entity.title,
			topic: entity.topic,
			start: entity.start,
			end: entity.end,
			classId: entity.classId
		}
	}
}
