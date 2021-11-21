import { IVideoRepository } from '../../irepositories/ivideo'
import { VideoFactory } from '../../factories/video'

export class EditVideoUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (id: string, factory: VideoFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
