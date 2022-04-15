import { IUserRepository } from '../../irepositories/iuser'

export class GetAllTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			where: [{ field: 'roles.isStranerdTutor', value: true }],
			all: true
		})
	}
}
