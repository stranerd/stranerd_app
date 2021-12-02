import { QueryParams } from '@modules/core'
import { IFlashCardRepository } from '../../irepositories/iflashCard'

export class GetUserFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'userId', value: userId }],
			sort: { field: 'createdAt', order: -1 },
			all: true
		}

		return await this.repository.get(conditions)
	}
}
