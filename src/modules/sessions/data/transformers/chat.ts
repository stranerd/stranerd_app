import { ChatFromModel, ChatToModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'

export class ChatTransformer {
	fromJSON (model: ChatFromModel) {
		const { id, content, media, sessionId, from, readAt, createdAt, updatedAt, path } = model
		return new ChatEntity({
			id, content, media, from, path, sessionId,
			createdAt, updatedAt, readAt
		})
	}

	toJSON (entity: ChatEntity): ChatToModel {
		return {
			content: entity.content,
			media: entity.media,
			sessionId: entity.sessionId,
			to: entity.to
		}
	}
}
