import { ICommentRepository } from '../../irepositories/icomment'
import { CommentFactory } from '../../factories/comment'

export class AddAnswerCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string, factory: CommentFactory) {
		const data = await factory.toModel()
		return await this.repository.add({ ...data, answerId })
	}
}
