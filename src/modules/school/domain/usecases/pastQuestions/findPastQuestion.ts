import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'

export class FindPastQuestionUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}
