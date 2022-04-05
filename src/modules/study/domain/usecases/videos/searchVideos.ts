import { IVideoRepository } from '../../irepositories/ivideo'
import { QueryParams } from '@modules/core'
import { SEARCH_PAGINATION_LIMIT } from '@utils/constants'

export class SearchVideosUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['title', 'description'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
