import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteEntity } from '../../domain/entities/note'

export class NoteTransformer {
	fromJSON (model: NoteFromModel) {
		const {
			id, userId, isHosted, media, description,
			link, userBio, title, tags, createdAt, updatedAt
		} = model
		return new NoteEntity({
			id, userId, description, isHosted, media, link, userBio, title, tags, createdAt, updatedAt
		})
	}

	toJSON (entity: NoteEntity): NoteToModel {
		return {
			isHosted: entity.isHosted,
			media: entity.media,
			link: entity.link,
			title: entity.title,
			description: entity.description,
			tags: entity.tags
		}
	}
}
