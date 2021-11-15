import { IAuthRepository } from '../../irepositories/iauth'

export class GetAuthUserUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.getAuthUser()
	}
}
