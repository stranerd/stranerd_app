import { ICommentRepository } from '../../irepositories/icomment'
import { CommentFactory } from '../../factories/comment'

export class EditCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (id: string, factory: CommentFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
