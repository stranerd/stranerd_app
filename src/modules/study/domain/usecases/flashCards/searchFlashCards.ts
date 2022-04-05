import { IFlashCardRepository } from '../../irepositories/iflashCard'
import { QueryParams } from '@modules/core'
import { SEARCH_PAGINATION_LIMIT } from '@utils/constants'

export class SearchFlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['title', 'set'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
