import { Listeners, QueryParams } from '@modules/core'
import { GroupEntity } from '../../entities/group'
import { IGroupRepository } from '../../irepositories/igroup'

export class ListenToGroupsUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (classId: string, listener: Listeners<GroupEntity>) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			return entity.classId === classId
		})
	}
}
