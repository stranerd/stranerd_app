import { ICommentRepository } from '../../irepositories/icomment'
import { CommentFactory } from '../../factories/comment'

export class AddCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (factory: CommentFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
