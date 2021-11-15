import { ISessionRepository } from '../../irepositories/isession'

export class EndSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.end(id)
	}
}
