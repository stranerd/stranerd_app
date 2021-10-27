import { IQuestionRepository } from '../../irepositories/iquestion'
import { QuestionFactory } from '../../factories/question'

export class EditQuestionUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (id: string, factory: QuestionFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
