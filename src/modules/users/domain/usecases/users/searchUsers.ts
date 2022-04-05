import { IUserRepository } from '../../irepositories/iuser'
import { QueryParams } from '@modules/core'
import { SEARCH_PAGINATION_LIMIT } from '@utils/constants'

export class SearchUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['bio.firstName', 'bio.lastName', 'bio.email'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
