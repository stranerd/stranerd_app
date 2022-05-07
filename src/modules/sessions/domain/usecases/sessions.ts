import { ISessionRepository } from '../irepositories/isession'
import { SessionFactory } from '../factories/session'
import { Conditions, Listeners } from '@modules/core'
import { SessionEntity } from '../entities/session'

export class SessionsUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async add (factory: SessionFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async accept (id: string, accepted: boolean) {
		return await this.repository.accept(id, accepted)
	}

	async cancel (id: string) {
		return await this.repository.cancel(id)
	}

	async end (id: string) {
		return await this.repository.end(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async getInList (ids: string[]) {
		return await this.repository.get({
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		})
	}

	async listenToOne (id: string, listener: Listeners<SessionEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listenInList (ids: string[], listener: Listeners<SessionEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}, listener, (entity) => ids.includes(entity.id))
	}
}
