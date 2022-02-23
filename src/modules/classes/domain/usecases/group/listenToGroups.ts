import {  Listeners, QueryParams } from '@modules/core'
import { GroupEntity } from '../../entities/group'
import { IGroupRepository } from '../../irepositories/igroup'


export class ListenToGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (path: string, listener: Listeners<GroupEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
 

