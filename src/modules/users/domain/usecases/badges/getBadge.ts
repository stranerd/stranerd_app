import { IBadgeRepository } from '../../irepositories/ibadge'

export class GetBadgeUseCase {
	private repository: IBadgeRepository

	constructor (repository: IBadgeRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		return await this.repository.find(userId)
	}
}
