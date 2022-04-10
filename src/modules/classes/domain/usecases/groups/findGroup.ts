import { IGroupRepository } from '../../irepositories/igroup'

export class FindGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}
}
