import { IUserRepository } from '../../irepositories/iuser'

export class UpdateStreakUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.updateStreak()
	}
}
