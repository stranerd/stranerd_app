import { IClassRepository } from '../../irepositories/iclass'
import { ClassUsers } from '@modules/classes/domain/entities/class'

export class ChangeMemberRoleUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, userId: string, role: ClassUsers, add: boolean) {
		return await this.repository.changeMemberRole(id, userId, role, add)
	}
}
