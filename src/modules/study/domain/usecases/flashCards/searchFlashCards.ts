import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class SearchFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['title', 'set'] }
		})
	}
}
