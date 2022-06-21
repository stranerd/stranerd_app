import { TagFromModel, TagToModel } from '../models/tag'
import { TagEntity } from '../../domain/entities/tag'

export class TagTransformer {
	fromJSON (model: TagFromModel) {
		const { id, title, type, parent, createdAt, updatedAt } = model
		return new TagEntity({
			id, title, type, parent, createdAt, updatedAt
		})
	}

	toJSON (entity: TagEntity): TagToModel {
		return {
			title: entity.title,
			type: entity.type,
			parent: entity.parent
		}
	}
}
