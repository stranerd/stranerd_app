import { VideoFromModel, VideoToModel } from '../models/video'
import { VideoEntity } from '../../domain/entities/video'

export class VideoTransformer {
	fromJSON (model: VideoFromModel) {
		const {
			id, userId, isHosted, media, description, preview,
			link, userBio, title, tags, createdAt, updatedAt
		} = model
		return new VideoEntity({
			id, userId, isHosted, media, preview, description, link, userBio, title, tags, createdAt, updatedAt
		})
	}

	toJSON (entity: VideoEntity): VideoToModel {
		return {
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
