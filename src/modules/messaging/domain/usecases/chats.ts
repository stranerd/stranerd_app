import { IChatRepository } from '../irepositories/ichat'
import { ChatFactory } from '../factories/chat'
import { Conditions, Listeners, QueryKeys, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT } from '@utils/constants'
import { ChatEntity } from '../entities/chat'
import { ChatType } from '@modules/messaging'

export class ChatsUseCase {
	private repository: IChatRepository

	constructor (repository: IChatRepository) {
		this.repository = repository
	}

	async add (factory: ChatFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async markRead (to: string) {
		return await this.repository.markRead(to)
	}

	async get (path: [string, string], date?: number) {
		const conditions: QueryParams = {
			where: [
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.classes },
						{ field: 'data.members', value: path[0] },
						{ field: 'to', value: path[1] }
					]
				},
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.personal },
						{ field: 'data.members', value: path[0] },
						{ field: 'data.members', value: path[1] }
					]
				}
			],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			limit: CHAT_PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async listen (path: [string, string], listener: Listeners<ChatEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.classes },
						{ field: 'data.members', value: path[0] },
						{ field: 'to', value: path[1] }
					]
				},
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.personal },
						{ field: 'data.members', value: path[0] },
						{ field: 'data.members', value: path[1] }
					]
				}
			],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (!entity.data.members.includes(path[0])) return false
			if (entity.isClasses(entity) && entity.to !== path[1]) return false
			if (entity.isPersonal(entity) && !entity.data.members.includes(path[1])) return false
			if (date) return entity.createdAt >= date
			else return true
		})
	}

	async getClassLibrary (classId: string) {
		const conditions: QueryParams = {
			where: [
				{ field: 'data.classId', value: classId },
				{ field: 'data.type', value: ChatType.classes },
				{
					condition: QueryKeys.or,
					value: [
						{ field: 'media', condition: Conditions.ne, value: null },
						{ field: 'links.0', condition: Conditions.exists, value: true }
					]
				}
			],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async listenToClassLibrary (classId: string, listener: Listeners<ChatEntity>) {
		const conditions: QueryParams = {
			where: [
				{ field: 'data.classId', value: classId },
				{ field: 'data.type', value: ChatType.classes },
				{
					condition: QueryKeys.or,
					value: [
						{ field: 'media', condition: Conditions.ne, value: null },
						{ field: 'links.0', condition: Conditions.exists, value: true }
					]
				}
			],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return [
				entity.data.type === ChatType.classes && entity.data.classId === classId,
				entity.media !== null || entity.links.length > 0
			].every((v) => v)
		})
	}

	async getUnReadCount (path: [string, string]) {
		const res = await this.repository.get({
			where: [
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.classes },
						{ field: 'data.members', value: path[0] },
						{ field: 'to', value: path[1] },
						{ field: `readAt.${path[0]}`, value: false, condition: Conditions.exists }
					]
				},
				{
					condition: QueryKeys.and,
					value: [
						{ field: 'data.type', value: ChatType.personal },
						{ field: 'data.members', value: path[0] },
						{ field: 'data.members', value: path[1] },
						{ field: `readAt.${path[0]}`, value: false, condition: Conditions.exists }
					]
				}
			],
			whereType: QueryKeys.or,
			limit: 1
		})
		return res.docs.total
	}
}
