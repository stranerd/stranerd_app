import { Listeners, QueryParams } from '@modules/core'
import { GroupEntity } from '../../entities/group'
import { IGroupRepository } from '../../irepositories/igroup'

export class ListenToGroupsUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (classId: string, listener: Listeners<GroupEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'classId', value: classId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.classId === classId
		})
	}
}
