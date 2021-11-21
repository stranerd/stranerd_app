import { IVideoCommentRepository } from '../../irepositories/ivideoComment'
import { VideoCommentFactory } from '../../factories/videoComment'

export class AddVideoCommentUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (factory: VideoCommentFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
