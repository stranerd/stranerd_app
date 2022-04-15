import { IUserRepository } from '../../irepositories/iuser'

export class GetAllAdminsUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async call () {
		return await this.repository.get({
			where: [{ field: 'roles.isStranerdAdmin', value: true }]
		})
	}
}
