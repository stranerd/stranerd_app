import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { FlashCardFactory } from '../../factories/flashCard'

export class EditFlashCardUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (id: string, factory: FlashCardFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
