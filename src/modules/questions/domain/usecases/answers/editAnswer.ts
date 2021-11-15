import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerFactory } from '../../factories/answer'

export class EditAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (id: string, factory: AnswerFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
