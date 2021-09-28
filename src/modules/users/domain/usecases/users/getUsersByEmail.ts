import { IUserRepository } from '../../irepositories/iuser'

export class GetUsersByEmailUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (email: string) {
		return await this.repository.get({
			where: [{ field: 'bio.email', value: email }],
			all: true
		})
	}
}
