import { IGroupRepository } from '../../irepositories/igroup'
import { GroupFactory } from '../../factories/group'

export class AddGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (factory: GroupFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}
}
