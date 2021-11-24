import { IVideoRepository } from '../../irepositories/ivideo'
import { VideoFactory } from '../../factories/video'

export class AddVideoUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (factory: VideoFactory) {
		return await this.repository.add(await factory.toModel())
	}
}
