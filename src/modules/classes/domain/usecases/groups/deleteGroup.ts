import { IGroupRepository } from '../../irepositories/igroup'

export class DeleteGroupUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}
}
