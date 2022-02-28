import { IGroupRepository } from '../../irepositories/igroup'
import { GroupFactory } from '../../factories/group'

export class EditGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (id: string, factory: GroupFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
