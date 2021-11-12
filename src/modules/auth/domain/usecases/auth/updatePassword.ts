import { IAuthRepository } from '../../irepositories/iauth'
import { PasswordUpdateFactory } from '../../factories/passwordUpdate'

export class UpdatePasswordUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: PasswordUpdateFactory) {
		return await this.repository.updatePassword(await factory.toModel())
	}
}
