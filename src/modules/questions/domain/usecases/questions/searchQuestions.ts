import { IQuestionRepository } from '../../irepositories/iquestion'

export class SearchQuestionsUseCase {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		this.repository = repository
	}

	async call (detail: string) {
		return await this.repository.get({
			all: true,
			search: { value: detail, fields: ['body'] }
		})
	}
}
