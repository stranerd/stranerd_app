import { QueryParams } from '@modules/core'
import { IClassRepository } from '../../irepositories/iclass'
import { ClassUsers } from '../../entities/class'

export class GetMyClassesUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: `users.${ClassUsers.members}`, value: userId }, { field: 'requests', value: 'userId' }],
			whereType: 'or',
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
