import { ChatMetaEntity } from '../../domain/entities/chatMeta'
import { ChatMetaFromModel } from '../../data/models/chatMeta'
import { ChatTransformer } from './chat'

export class ChatMetaTransformer {
	fromJSON (model: ChatMetaFromModel) {
		const { id, data, members, last, readAt, createdAt, updatedAt } = model
		return new ChatMetaEntity({
			id, data, members,
			last: last ? new ChatTransformer().fromJSON(last) : null,
			readAt, createdAt, updatedAt
		})
	}
}
