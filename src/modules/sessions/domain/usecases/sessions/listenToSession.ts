import { Listeners } from '@modules/core'
import { ISessionRepository } from '../../irepositories/isession'
import { SessionEntity } from '../../entities/session'

export class ListenToSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<SessionEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
