import { IDiscussionRepository } from '../../irepositories/idiscussion'
import { DiscussionFactory } from '../../factories/discussion'

export class AddDiscussionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (classId: string, factory: DiscussionFactory) {
		const data = await factory.toModel()
		return await this.repository.add(classId, data)
	}
}
