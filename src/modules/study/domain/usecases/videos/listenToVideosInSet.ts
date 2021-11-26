import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IVideoRepository } from '../../irepositories/ivideo'
import { VideoEntity } from '../../entities/video'

export class ListenToVideosInSetUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async call (ids: string[], listener: Listeners<VideoEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}
}
