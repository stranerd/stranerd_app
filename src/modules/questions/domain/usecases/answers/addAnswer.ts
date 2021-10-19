import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerFactory } from '../../factories/answer'

export class AddAnswerUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (factory: AnswerFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
