import { Listeners } from '@modules/core'
import { IBadgeRepository } from '../../irepositories/ibadge'
import { BadgeEntity } from '../../entities/badge'

export class ListenToBadgeUseCase {
	private repository: IBadgeRepository

	constructor (repository: IBadgeRepository) {
		this.repository = repository
	}

	async call (userId: string, id: string, listener: Listeners<BadgeEntity>) {
		return await this.repository.listenToOne(userId, id, listener)
	}
}
