import { ICommentRepository } from '../../irepositories/icomment'

export class GetAnswerCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (answerId: string) {
		return await this.repository.get({
			where: [{ field: 'answerId', value: answerId }],
			sort: [{ field: 'createdAt' }],
			all: true
		})
	}
}
