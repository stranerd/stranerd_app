import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatTransformer {
	fromJSON (model: ChatFromModel) {
		const { id, body, media, data, links, from, readAt, createdAt, updatedAt, to } = model
		return new ChatEntity({
			id, body, media, data, from, to, links,
			createdAt, updatedAt, readAt
		})
	}

	toJSON (entity: ChatEntity): ChatToModel {
		return {
			body: entity.body,
			media: entity.media,
			to: entity.to
		}
	}
}
