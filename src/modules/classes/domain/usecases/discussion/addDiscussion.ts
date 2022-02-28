import { IDiscussionRepository } from '../../irepositories/idiscussion'
import { DiscussionFactory } from '../../factories/discussion'

export class AddDiscussionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (factory: DiscussionFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
