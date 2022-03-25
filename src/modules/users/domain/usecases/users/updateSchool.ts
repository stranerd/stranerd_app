import { IUserRepository } from '../../irepositories/iuser'
import { UserSchoolFactory } from '../../factories/userSchool'

export class UpdateSchoolUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call (factory: UserSchoolFactory) {
		return await this.repository.updateSchool(await factory.toModel())
	}
}
