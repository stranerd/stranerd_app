import { VideoFromModel, VideoToModel } from '../models/video'
import { VideoEntity } from '../../domain/entities/video'

export class VideoTransformer {
	fromJSON (model: VideoFromModel) {
		const {
			id, userId, isHosted, media, description, preview, isPublic,
			link, userBio, userRoles, title, tags, createdAt, updatedAt
		} = model
		return new VideoEntity({
			id,
			userId,
			isHosted,
			media,
			preview,
			description,
			link,
			userBio,
			userRoles,
			title,
			tags,
			createdAt,
			updatedAt,
			isPublic
		})
	}

	toJSON (entity: VideoEntity): VideoToModel {
		return {
			isPublic: entity.isPublic,
			isHosted: entity.isHosted,
			media: entity.media,
			preview: entity.preview,
			link: entity.link,
			title: entity.title,
			description: entity.description,
			tags: entity.tags
		}
	}
}
