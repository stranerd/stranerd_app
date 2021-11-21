import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardFactory } from '../../factories/flashCard'

export class AddFlashCardUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (factory: FlashCardFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
