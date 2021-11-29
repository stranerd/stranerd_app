import { Listeners } from '@modules/core'
import { IVideoRepository } from '../../irepositories/ivideo'
import { VideoEntity } from '../../entities/video'

export class ListenToVideoUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (id: string, listener: Listeners<VideoEntity>) {
		return await this.repository.listenToOne(id, listener)
	}
}
