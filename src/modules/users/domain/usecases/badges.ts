import { IBadgeRepository } from '../irepositories/ibadge'
import { Listeners } from '@modules/core'
import { BadgeEntity } from '../entities/badge'

export class BadgesUseCase {
	private repository: IBadgeRepository

	constructor (repository: IBadgeRepository) {
		this.repository = repository
	}

	async get () {
		return await this.repository.get()
	}

	async listen (id: string, listener: Listeners<BadgeEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
