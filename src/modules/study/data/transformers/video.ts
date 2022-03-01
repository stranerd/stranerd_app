import { VideoFromModel, VideoToModel } from '../models/video'
import { VideoEntity } from '../../domain/entities/video'

export class VideoTransformer {
	fromJSON (model: VideoFromModel) {
		const {
			id, userId, isHosted, media, description, isPublic,
			link, userBio, userRoles, title, createdAt, updatedAt
		} = model
		return new VideoEntity({
			id,
			userId,
			isHosted,
			media,
			description,
			link,
			userBio,
			userRoles,
			title,
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
			link: entity.link,
			title: entity.title,
			description: entity.description
		}
	}
}
