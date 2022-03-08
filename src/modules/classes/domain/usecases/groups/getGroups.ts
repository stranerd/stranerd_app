import { QueryParams } from '@modules/core'
import { IGroupRepository } from '../../irepositories/igroup'

export class GetGroupsUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (classId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'classId', value: classId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
