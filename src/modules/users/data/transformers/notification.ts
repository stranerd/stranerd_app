import { NotificationFromModel, NotificationToModel } from '../models/notification'
import { NotificationEntity } from '../../domain/entities/notification'

export class NotificationTransformer {
	fromJSON (model: NotificationFromModel) {
		const { id, userId, data, body, seen, createdAt, updatedAt } = model
		return new NotificationEntity({
			id, userId, data, body, seen, createdAt, updatedAt
		})
	}

	toJSON (entity: NotificationEntity): NotificationToModel {
		return {
			body: entity.body,
			data: entity.data,
			seen: entity.seen
		}
	}
}
