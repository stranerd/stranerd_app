import { IAuthRepository } from '../../irepositories/iauth'
import { UserRoles } from '@modules/users'

export class UpdateRoleUseCase {
	private repository: IAuthRepository

	constructor (repository: IAuthRepository) {
		this.repository = repository
	}

	async call (id: string, role: keyof UserRoles, value: boolean) {
		return await this.repository.updateRole({ id, value, role })
	}
}
