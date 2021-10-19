import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMetaFromModel } from '../../data/models/chatMeta'
import { ChatTransformer } from './chat'

export class ChatMetaTransformer {
	fromJSON (model: ChatMetaFromModel) {
		const { id, userBio, userId, ownerId, last, unRead, createdAt, updatedAt } = model
		return new ChatMetaEntity({
			id, userBio, userId, ownerId, last: new ChatTransformer().fromJSON(last), unRead, createdAt, updatedAt
		})
	}
}
