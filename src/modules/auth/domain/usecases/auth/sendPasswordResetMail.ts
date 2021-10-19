import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordResetRequestFactory } from '../../factories/passwordResetRequest'

export class SendPasswordResetEmailUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (factory: PasswordResetRequestFactory) {
		const { email } = await factory.toModel()
		return await this.repository.sendPasswordResetEmail(email)
	}
}
