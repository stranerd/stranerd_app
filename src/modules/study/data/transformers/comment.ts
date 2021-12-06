import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentEntity } from '../../domain/entities/comment'

export class CommentTransformer {
	fromJSON (model: CommentFromModel) {
		const { id, body, data, userId, userBio, createdAt, updatedAt } = model
		return new CommentEntity({
			id, body, data, userId, userBio, createdAt, updatedAt
		})
	}

	toJSON (entity: CommentEntity): CommentToModel {
		return {
			body: entity.body,
			data: entity.data
		}
	}
}
