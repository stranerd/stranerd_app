import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class FindDiscussionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}
}
