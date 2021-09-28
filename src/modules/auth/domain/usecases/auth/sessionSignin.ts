import { IAuthRepository } from '../../irepositories/iauth'
import { AfterAuthUser } from '../../entities/auth'

export class SessionSigninUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (afterAuth: AfterAuthUser) {
		return await this.repository.session(afterAuth)
	}
}
