import { ISessionRepository } from '../../irepositories/isession'
import { SessionFactory } from '../../factories/session'

export class AddSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (factory: SessionFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
