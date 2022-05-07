import { ICommentRepository } from '../irepositories/icomment'
import { CommentFactory } from '../factories/comment'
import { Listeners } from '@modules/core'
import { CommentEntity } from '@modules/questions'

export class AnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async add (answerId: string, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.add({ ...data, answerId })
	}

	async get (answerId: string) {
		return await this.repository.get({
			where: [{ field: 'answerId', value: answerId }],
			sort: [{ field: 'createdAt' }],
			all: true
		})
	}

	async listen (answerId: string, listener: Listeners<CommentEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'answerId', value: answerId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}, listener, (entity) => entity.answerId === answerId)
	}
}
