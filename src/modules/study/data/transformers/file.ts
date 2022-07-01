import { FileFromModel, FileToModel } from '../models/file'
import { FileEntity } from '../../domain/entities/file'

export class FileTransformer {
	fromJSON (model: FileFromModel) {
		const { id, user, media, title, createdAt, updatedAt } = model
		return new FileEntity({
			id, user, media, title, createdAt, updatedAt
		})
	}

	toJSON (entity: FileEntity): FileToModel {
		return {
			title: entity.title,
			media: entity.media
		}
	}
}
