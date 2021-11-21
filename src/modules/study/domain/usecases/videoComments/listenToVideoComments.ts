import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IVideoCommentRepository } from '../../irepositories/ivideoComment'
import { VideoCommentEntity } from '../../entities/videoComment'

export class ListenToVideoCommentsUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<VideoCommentEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt > date
			return true
		})
	}
}
