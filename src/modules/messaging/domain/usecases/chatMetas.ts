import { Listeners, QueryParams } from '@modules/core'
import { IChatMetaRepository } from '../irepositories/ichatMeta'
import { ChatMetaEntity } from '../entities/chatMeta'

export class ChatMetasUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async get () {
		const conditions: QueryParams = {
			sort: [{ field: 'last.createdAt', desc: true }],
			all: true
		}
		return await this.repository.get(conditions)
	}

	async listen (listener: Listeners<ChatMetaEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'last.createdAt', desc: true }],
			all: true
		}
		return await this.repository.listenToMany(conditions, listener, (entity) => !!entity)
	}
}
