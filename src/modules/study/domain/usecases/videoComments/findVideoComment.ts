import { IVideoCommentRepository } from '../../irepositories/ivideoComment'

export class FindVideoCommentUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (id: string) {
		return await this.repository.find(id)
	}
}