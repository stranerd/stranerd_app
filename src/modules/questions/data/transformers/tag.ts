import { TagFromModel, TagToModel } from '../models/tag'
import { TagEntity } from '../../domain/entities/tag'

export class TagTransformer {
	fromJSON (model: TagFromModel) {
		const { id, title, parent, createdAt, updatedAt } = model
		return new TagEntity({
			id, title, parent, createdAt, updatedAt
		})
	}

	toJSON (entity: TagEntity): TagToModel {
		return {
			title: entity.title,
			parent: entity.parent
		}
	}
}
