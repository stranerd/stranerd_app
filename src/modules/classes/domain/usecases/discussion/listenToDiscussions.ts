import {  Listeners, QueryParams } from '@modules/core'
import { DiscussionEntity } from '../../entities/discussion'
import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class ListenToChatsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (path: string, listener: Listeners<DiscussionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.listenToOne(path,  listener)
	}
}
