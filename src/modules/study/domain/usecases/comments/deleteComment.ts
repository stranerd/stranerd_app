import { ICommentRepository } from '../../irepositories/icomment'

export class DeleteCommentUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.delete(id)
	}
}