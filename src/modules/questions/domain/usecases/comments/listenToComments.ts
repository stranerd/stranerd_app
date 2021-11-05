import { Listeners } from '@modules/core'
import { ICommentRepository } from '../../irepositories/icomment'
import { CommentEntity } from '../../entities/comment'

export class ListenToQuestionCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (questionId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'questionId', value: questionId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}, listener, (entity) => entity.questionId === questionId)
	}
}

export class ListenToAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'answerId', value: answerId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}, listener, (entity) => entity.answerId === answerId)
	}
}
