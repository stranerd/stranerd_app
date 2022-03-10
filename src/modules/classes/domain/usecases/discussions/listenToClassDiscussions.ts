import { Conditions, Listeners, QueryKeys, QueryParams } from '@modules/core'
import { DiscussionEntity } from '../../entities/discussion'
import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class ListenToClassDiscussionsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (classId: string, listener: Listeners<DiscussionEntity>) {
		const conditions: QueryParams = {
			where: [
				{ field: 'classId', value: classId },
				{
					condition: QueryKeys.or, value: [
						{ field: 'media', condition: Conditions.ne, value: null },
						{ field: 'links', condition: Conditions.ne, value: [] }
					]
				}
			],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.classId === classId && (entity.media !== null || entity.links.length > 0)
		})
	}
}
