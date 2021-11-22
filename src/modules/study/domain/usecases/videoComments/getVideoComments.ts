import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IVideoCommentRepository } from '../../irepositories/ivideoComment'

export class GetVideoCommentsUseCase {
	private repository: IVideoCommentRepository

	constructor (repository: IVideoCommentRepository) {
		this.repository = repository
	}

	async call (videoId: string, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'videoId', value: videoId }],
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}
}
