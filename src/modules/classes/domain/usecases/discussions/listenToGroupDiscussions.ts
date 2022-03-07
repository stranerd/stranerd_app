import { Conditions, Listeners, QueryParams } from '@modules/core'
import { DiscussionEntity } from '../../entities/discussion'
import { IDiscussionRepository } from '../../irepositories/idiscussion'

export class ListenToGroupDiscussionsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async call (groupId: string, listener: Listeners<DiscussionEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'groupId', value: groupId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (entity.groupId !== groupId) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
