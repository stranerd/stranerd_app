import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteEntity } from '../../domain/entities/note'

export class NoteTransformer {
	fromJSON (model: NoteFromModel) {
		const {
			id, user, isHosted, media, description,
			link, title, createdAt, updatedAt
		} = model
		return new NoteEntity({
			id,
			user,
			description,
			isHosted,
			media,
			link,
			title,
			createdAt,
			updatedAt
		})
	}

	toJSON (entity: NoteEntity): NoteToModel {
		return {
			isHosted: entity.isHosted,
			media: entity.media,
			link: entity.link,
			title: entity.title,
			description: entity.description
		}
	}
}
