import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class DeleteFlashCardUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
