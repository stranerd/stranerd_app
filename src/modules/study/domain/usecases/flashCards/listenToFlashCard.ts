import { Listeners } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardEntity } from '../../entities/flashCard'

export class ListenToFlashCardUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<FlashCardEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
