import { IPastQuestionRepository } from '../../irepositories/ipastQuestion'
import { PastQuestionFactory } from '../../factories/pastQuestion'

export class EditPastQuestionUseCase {
	private repository: IPastQuestionRepository

	constructor (repository: IPastQuestionRepository) {
		this.repository = repository
	}

	async call (id: string, factory: PastQuestionFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
