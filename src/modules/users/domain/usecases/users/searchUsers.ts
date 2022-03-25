import { IUserRepository } from '../../irepositories/iuser'

export class SearchUsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['bio.firstName', 'bio.lastName', 'bio.email'] }
		})
	}
}
