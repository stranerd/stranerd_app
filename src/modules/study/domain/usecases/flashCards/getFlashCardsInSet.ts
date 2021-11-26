import { Conditions, QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class GetFlashCardsInSetUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}
}
