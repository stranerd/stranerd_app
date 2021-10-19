import { IUserRepository } from '../../irepositories/iuser'

export class FindUserUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
