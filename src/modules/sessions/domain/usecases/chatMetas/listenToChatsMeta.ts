import { Listeners, QueryParams } from '@modules/core'
import { IChatMetaRepository } from '../../irepositories/ichatMeta'
import { ChatMetaEntity } from '../../entities/chatMeta'

export class ListenToChatsMetaUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<ChatMetaEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'last.createdAt' }],
			all: true
		}
		return await this.repository.listenToMany(conditions, listener, (entity) => !!entity)
	}
}
