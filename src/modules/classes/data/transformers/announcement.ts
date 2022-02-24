import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcement'
import { AnnouncementEntity } from '../../domain/entities/announcement'

export class ChatTransformer {
	fromJSON (model: AnnouncementFromModel) {
		const {     id, body, createdAt, userId, userBio, userRoles, updatedAt} = model
		return new AnnouncementEntity({
			id, body, createdAt, userId, userBio, userRoles, updatedAt
		})
	}

	toJSON (entity: AnnouncementEntity): AnnouncementToModel {
		return {
			body: entity.body,
		
		}
	}
}
