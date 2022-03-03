import { Listeners } from '@modules/core'
import { ICommentRepository } from '../../irepositories/icomment'
import { CommentEntity } from '../../entities/comment'

export class ListenToAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'answerId', value: answerId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}, listener, (entity) => entity.answerId === answerId)
	}
}
