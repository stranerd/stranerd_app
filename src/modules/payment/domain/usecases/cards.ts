import { ICardRepository } from '../irepositories/icard'
import { Listeners } from '@modules/core'
import { CardEntity } from '../entities/card'

export class CardsUseCase {
	private repository: ICardRepository

	constructor (repository: ICardRepository) {
		this.repository = repository
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async makePrimary (id: string) {
		return await this.repository.makePrimary(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get () {
		return await this.repository.get({ all: true })
	}

	async listenToOne (id: string, listener: Listeners<CardEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<CardEntity>) {
		return await this.repository.listenToMany({ all: true }, listener, () => true)
	}
}
