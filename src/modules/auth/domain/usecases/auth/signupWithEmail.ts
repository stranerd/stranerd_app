import { IAuthRepository } from '../../irepositories/iauth'
import { EmailSignupFactory } from '../../factories/emailSignup'
import { AuthExtras } from '../../entities/auth'

export class SignupWithEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: EmailSignupFactory, extras: AuthExtras) {
		return await this.repository.signupWithEmail(await factory.toModel(), extras)
	}
}
