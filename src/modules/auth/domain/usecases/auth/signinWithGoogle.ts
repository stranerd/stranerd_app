import { IAuthRepository } from '../../irepositories/iauth'
import { AuthExtras } from '../../entities/auth'

export class SigninWithGoogleUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (idToken: string, extras: AuthExtras) {
		return await this.repository.signinWithGoogle(idToken, extras)
	}
}
