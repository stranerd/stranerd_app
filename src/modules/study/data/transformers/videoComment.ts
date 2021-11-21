import { VideoCommentFromModel, VideoCommentToModel } from '../models/videoComment'
import { VideoCommentEntity } from '../../domain/entities/videoComment'

export class VideoCommentTransformer {
	fromJSON (model: VideoCommentFromModel) {
		const { id, videoId, body, userBio, userId, createdAt, updatedAt } = model
		return new VideoCommentEntity({
			id, videoId, body, userBio, userId, createdAt, updatedAt
		})
	}

	toJSON (entity: VideoCommentEntity): VideoCommentToModel {
		return {
			body: entity.body,
			videoId: entity.videoId
		}
	}
}
