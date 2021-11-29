import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteEntity } from '../../domain/entities/note'

export class NoteTransformer {
	fromJSON (model: NoteFromModel) {
		const {
			id, userId, isHosted, media, description, preview,
			link, userBio, title, tags, createdAt, updatedAt
		} = model
		return new NoteEntity({
			id, userId, description, isHosted, media, preview, link, userBio, title, tags, createdAt, updatedAt
		})
	}

	toJSON (entity: NoteEntity): NoteToModel {
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
