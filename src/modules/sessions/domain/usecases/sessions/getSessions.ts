import { Conditions } from '@modules/core'
import { ISessionRepository } from '../../irepositories/isession'

export class GetSessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		return await this.repository.get({
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		})
	}
}
