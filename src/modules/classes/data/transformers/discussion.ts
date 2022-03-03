import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'
import { DiscussionEntity } from '../../domain/entities/discussion'

export class DiscussionTransformer {
	fromJSON (model: DiscussionFromModel) {
		const { id, content, media, groupId, userId, userBio, userRoles, createdAt, updatedAt } = model
		return new DiscussionEntity({
			id, content, media, groupId, userId, userBio, userRoles, createdAt, updatedAt
		})
	}

	toJSON (entity: DiscussionEntity): DiscussionToModel {
		return {
			content: entity.content,
			media: entity.media,
			groupId: entity.groupId
		}
	}
}