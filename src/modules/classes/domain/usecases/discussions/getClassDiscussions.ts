import { Conditions, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class GetClassDiscussionsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (classId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'classId', value: classId }, { field: 'media', condition: Conditions.ne, value: null }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		return await this.repository.get(conditions)
	}
}
