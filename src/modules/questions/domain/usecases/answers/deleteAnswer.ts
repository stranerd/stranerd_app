import { IAnswerRepository } from '../../irepositories/ianswer'

export class DeleteAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}
