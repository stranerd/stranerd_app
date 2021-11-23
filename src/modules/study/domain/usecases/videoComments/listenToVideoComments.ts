import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IVideoCommentRepository } from '../../irepositories/ivideoComment'
import { VideoCommentEntity } from '../../entities/videoComment'

export class ListenToVideoCommentsUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (videoId: string, listener: Listeners<VideoCommentEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'videoId', value: videoId }],
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt > date
			return true
		})
	}
}
