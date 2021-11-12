import { IUserRepository } from '../../irepositories/iuser'
import { TutorUpdateFactory } from '../../factories/tutorUpdate'

export class UpdateTutorUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	public async call (factory: TutorUpdateFactory) {
		return await this.repository.updateTutor(await factory.toModel())
	}
}
