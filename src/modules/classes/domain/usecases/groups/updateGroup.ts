import { IGroupRepository } from '../../irepositories/igroup'
import { GroupFactory } from '../../factories/group'

export class UpdateGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (id: string, factory: GroupFactory) {
		const data = await factory.toModel()
		return await this.repository.update(data.classId, id, data)
	}
}
