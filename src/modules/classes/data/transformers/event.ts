import { EventFromModel, EventToModel } from '../models/event'
import { EventEntity } from '../../domain/entities/event'

export class EventTransformer {
	fromJSON (model: EventFromModel) {
		const { id, title, data, user, users, createdAt, classId, readAt, updatedAt } = model
		return new EventEntity({
			id, title, data, user, users, classId, readAt, createdAt, updatedAt
		})
	}

	toJSON (entity: EventEntity): EventToModel {
		return {
			title: entity.title,
			data: entity.data,
			classId: entity.classId
		}
	}
}
