import { NoteFromModel, NoteToModel } from '../models/note'
import { NoteEntity } from '../../domain/entities/note'

export class NoteTransformer {
	fromJSON (model: NoteFromModel) {
		const {
			id, user, isPrivate, content,
			links, title, createdAt, updatedAt
		} = model
		return new NoteEntity({
			id, user, content, isPrivate, links, title,
			createdAt, updatedAt
		})
	}

	toJSON (entity: NoteEntity): NoteToModel {
		return {
			isPrivate: entity.isPrivate,
			title: entity.title,
			content: entity.content
		}
	}
}
