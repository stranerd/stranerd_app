import { DiscussionFromModel, DiscussionToModel } from '../models/discussion'
import { DiscussionEntity } from '../../domain/entities/discussion'

export class DiscussionTransformer {
	fromJSON (model: DiscussionFromModel) {
		const { id, content, media, links, groupId, classId, user, createdAt, updatedAt } = model
		return new DiscussionEntity({
			id, content, media, links, groupId, classId, user, createdAt, updatedAt
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
