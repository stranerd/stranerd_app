import { IVideoCommentRepository } from '../../irepositories/ivideoComment'
import { VideoCommentFactory } from '../../factories/videoComment'

export class EditVideoCommentUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (id: string, factory: VideoCommentFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
