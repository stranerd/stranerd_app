import { TagFromModel, TagToModel } from '../models/tag'
import { TagEntity } from '../../domain/entities/tag'

export class TagTransformer {
	fromJSON (model: TagFromModel) {
		const { id, name, count, createdAt, updatedAt } = model
		return new TagEntity({
			id, name, count, createdAt, updatedAt
		})
	}

	toJSON (entity: TagEntity): TagToModel {
		return {
			name: entity.name
		}
	}
}
