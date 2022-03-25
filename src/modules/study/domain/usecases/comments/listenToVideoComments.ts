import { Conditions, Listeners, QueryParams } from '@modules/core'
import { ICommentRepository } from '../../irepositories/icomment'
import { CommentEntity } from '../../entities/comment'

export class ListenToVideoCommentsUseCase {
	private repository: ICommentRepository

	constructor (repository: ICommentRepository) {
		this.repository = repository
	}

	async call (videoId: string, listener: Listeners<CommentEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'data.videoId', value: videoId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
