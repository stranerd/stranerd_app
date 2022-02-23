import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class DeleteQuestionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
