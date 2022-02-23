import { IDiscussionRepository } from '../../irepositories/idiscussion'
 
export class FindQuestionUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
