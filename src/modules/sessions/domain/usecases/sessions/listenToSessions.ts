import { Conditions, Listeners } from '@modules/core'
import { ISessionRepository } from '../../irepositories/isession'
import { SessionEntity } from '../../entities/session'

export class ListenToSessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<SessionEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}, listener, (entity) => ids.includes(entity.id))
	}
}
