import { IAuthRepository } from '../../irepositories/iauth'
import { ProfileUpdateFactory } from '../../factories/profileUpdate'

export class UpdateProfileUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	public async call (factory: ProfileUpdateFactory) {
		return await this.repository.updateProfile(await factory.toModel())
	}
}
