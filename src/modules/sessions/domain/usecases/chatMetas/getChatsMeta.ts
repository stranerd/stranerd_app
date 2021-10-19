import { QueryParams } from '@modules/core'
import { IChatMetaRepository } from '../../irepositories/ichatMeta'

export class GetChatsMetaUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: QueryParams = {
			sort: { field: 'last.createdAt', order: -1 },
			all: true
		}
		return await this.repository.get(conditions)
	}
}
