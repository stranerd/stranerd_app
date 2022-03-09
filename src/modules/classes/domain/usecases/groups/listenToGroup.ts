import { Listeners } from '@modules/core'
import { GroupEntity } from '../../entities/group'
import { IGroupRepository } from '../../irepositories/igroup'

export class ListenToGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (groupId: string, listener: Listeners<GroupEntity>) {
		return await this.repository.listenToOne(groupId, listener)
	}
}
