import { ICommentRepository } from '../../irepositories/icomment'

export class GetQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string) {
		return await this.repository.get({
			where: [{ field: 'questionId', value: questionId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		})
	}
}

export class GetAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string) {
		return await this.repository.get({
			where: [{ field: 'answerId', value: answerId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		})
	}
}
