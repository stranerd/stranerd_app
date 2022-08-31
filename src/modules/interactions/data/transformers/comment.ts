import { CommentFromModel, CommentToModel } from '../models/comment'
import { CommentEntity } from '../../domain/entities/comment'

export class CommentTransformer {
	fromJSON (model: CommentFromModel) {
		const { id, body, entity, meta, user, createdAt, updatedAt } = model
		return new CommentEntity({
			id, body, entity, user, meta, createdAt, updatedAt
		})
	}

	toJSON (entity: CommentEntity): CommentToModel {
		return {
			body: entity.body,
			entity: entity.entity
		}
	}
}
