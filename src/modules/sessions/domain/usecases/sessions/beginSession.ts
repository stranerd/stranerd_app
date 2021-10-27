import { ISessionRepository } from '../../irepositories/isession'

export class BeginSessionUseCase {
	private repository: ISessionRepository

	constructor (repository: ISessionRepository) {
		this.repository = repository
	}

	async call (id: string, accepted: boolean) {
		return await this.repository.accept(id, accepted)
	}
}
