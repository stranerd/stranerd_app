import { IAnswerRepository } from '../../irepositories/ianswer'

export class GetAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string) {
		return await this.repository.get({
			where: [{ field: 'questionId', value: questionId }],
			sort: { field: 'createdAt' },
			all: true
		})
	}
}
