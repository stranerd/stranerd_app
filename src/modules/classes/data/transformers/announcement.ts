import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'
import { AnnouncementEntity } from '../../domain/entities/announcement'

export class AnnouncementTransformer {
	fromJSON (model: AnnouncementFromModel) {
		const { id, body, classId, users, createdAt, userId, userBio, userRoles, updatedAt } = model
		return new AnnouncementEntity({
			id, body, classId, users, createdAt, userId, userBio, userRoles, updatedAt
		})
	}

	toJSON (entity: AnnouncementEntity): AnnouncementToModel {
		return {
			body: entity.body,
			classId: entity.classId
		}
	}
}