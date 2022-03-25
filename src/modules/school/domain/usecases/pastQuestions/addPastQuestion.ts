import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'
import { PastQuestionFactory } from '../../factories/pastQuestion'

export class AddPastQuestionUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (factory: PastQuestionFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
