import { IQuestionRepository } from '../../irepositories/iquestion'

export class MarkBestAnswerUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (questionId: string, answerId: string) {
		return await this.repository.markBestAnswer(questionId, answerId)
	}
}
