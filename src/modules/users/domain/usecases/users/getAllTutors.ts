import { appName } from '@utils/environment'
import { IUserRepository } from '../../irepositories/iuser'

export class GetAllTutorsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			where: [{ field: `roles.${appName}.isTutor`, value: true }],
			all: true
		})
	}
}
