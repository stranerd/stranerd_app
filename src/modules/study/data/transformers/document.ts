import { DocumentFromModel, DocumentToModel } from '../models/document'
import { DocumentEntity } from '../../domain/entities/document'

export class DocumentTransformer {
	fromJSON (model: DocumentFromModel) {
		const {
			id, user, isPrivate, media, content,
			links, title, createdAt, updatedAt
		} = model
		return new DocumentEntity({
			id, user, content, isPrivate, media, links, title,
			createdAt, updatedAt
		})
	}

	toJSON (entity: DocumentEntity): DocumentToModel {
		return {
			isPrivate: entity.isPrivate,
			media: entity.media,
			title: entity.title,
			content: entity.content
		}
	}
}
