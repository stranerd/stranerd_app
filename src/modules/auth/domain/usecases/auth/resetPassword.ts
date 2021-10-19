import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordResetFactory } from '../../factories/passwordReset'

export class ResetPasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (token: string, factory: PasswordResetFactory) {
		const { password } = await factory.toModel()
		return await this.repository.resetPassword(token, password)
	}
}
