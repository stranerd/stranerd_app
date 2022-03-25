import { IUserRepository } from '../../irepositories/iuser'
import { Conditions } from '@modules/core'

export class GetUsersInListUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const users = await this.repository.get({
			where: [{ field: 'id', value: ids, condition: Conditions.in }],
			all: true
		})
		return users.results
	}
}
