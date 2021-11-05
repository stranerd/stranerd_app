import { Listeners } from '@modules/core'
import { IAnswerRepository } from '../../irepositories/ianswer'
import { AnswerEntity } from '../../entities/answer'

export class ListenToAnswersUseCase {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		this.repository = repository
	}

	async call (questionId: string, listener: Listeners<AnswerEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'questionId', value: questionId }],
			sort: { field: 'createdAt' },
			all: true
		}, listener, (entity) => entity.questionId === questionId)
	}
}
