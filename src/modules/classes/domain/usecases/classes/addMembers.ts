import { IClassRepository } from '../../irepositories/iclass'

export class AddMembersUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async call (id: string, userIds: string[], add: boolean) {
		return await this.repository.addMembers(id, userIds, add)
	}
}
