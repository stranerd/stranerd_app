import { ITestRepository } from '../../irepositories/itest'

export class UpdateTestAnswerUseCase {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		this.repository = repository
	}

	async call (id: string, questionId: string, answer: number) {
		return await this.repository.updateAnswer(id, questionId, answer)
	}
}
