import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionFactory } from '../../factories/question'

export class AddQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (factory: QuestionFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
