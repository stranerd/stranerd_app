import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class FindFlashCardUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
