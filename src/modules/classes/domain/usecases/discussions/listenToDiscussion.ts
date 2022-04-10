import { Listeners } from '@modules/core'
import { DiscussionEntity } from '../../entities/discussion'
import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class ListenToDiscussionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string, listener: Listeners<DiscussionEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}
}
