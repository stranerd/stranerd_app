import { IQuestionRepository } from '../../irepositories/iquestion'
import { QueryParams } from '@modules/core'
import { SEARCH_PAGINATION_LIMIT } from '@utils/constants'

export class SearchQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['body'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
