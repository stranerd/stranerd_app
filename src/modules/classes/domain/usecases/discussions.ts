import { IDiscussionRepository } from '../irepositories/idiscussion'
import { DiscussionFactory } from '../factories/discussion'
import { Conditions, Listeners, QueryKeys, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { DiscussionEntity } from '../entities/discussion'

export class DiscussionsUseCase {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		this.repository = repository
	}

	async add (classId: string, factory: DiscussionFactory) {
		const data = await factory.toModel()
		return await this.repository.add(classId, data)
	}

	async find (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}

	async getClassLibrary (classId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'media', condition: Conditions.ne, value: null }, {
				field: 'links.0',
				condition: Conditions.exists,
				value: true
			}],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		return await this.repository.get(classId, conditions)
	}

	async getGroupDiscussions (classId: string, groupId: string, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'groupId', value: groupId }],
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(classId, conditions)
	}

	async listenToOne (classId: string, id: string, listener: Listeners<DiscussionEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}

	async listenToClassLibrary (classId: string, listener: Listeners<DiscussionEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'media', condition: Conditions.ne, value: null }, {
				field: 'links.0',
				condition: Conditions.exists,
				value: true
			}],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			return entity.classId === classId && (entity.media !== null || entity.links.length > 0)
		})
	}

	async listenToGroupDiscussions (classId: string, groupId: string, listener: Listeners<DiscussionEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [{ field: 'groupId', value: groupId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			if (entity.groupId !== groupId) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
