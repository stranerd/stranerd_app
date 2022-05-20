import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'
import { AnnouncementEntity } from '../../domain/entities/announcement'

export class AnnouncementTransformer {
	fromJSON (model: AnnouncementFromModel) {
		const { id, body, classId, reminder, users, createdAt, user, updatedAt } = model
		return new AnnouncementEntity({
			id, body, classId, reminder, users, createdAt, user, updatedAt
		})
	}

	toJSON (entity: AnnouncementEntity): AnnouncementToModel {
		return {
			body: entity.body,
			reminder: entity.reminder,
			classId: entity.classId
		}
	}
}
