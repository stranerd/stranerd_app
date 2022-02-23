 import { IDiscussionRepository } from '../../irepositories/idiscussion'
import { DiscussionFactory } from '../../factories/discussion'

export class EditQuestionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (id: string, factory: DiscussionFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
