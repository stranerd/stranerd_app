import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'

export class DeletePastQuestionUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
