import { IChatRepository } from '../irepositories/ichat'
import { ChatFactory } from '../factories/chat'
import { Conditions, Listeners, QueryKeys, QueryParams } from '@modules/core'
import { CHAT_PAGINATION_LIMIT, PAGINATION_LIMIT } from '@utils/constants'
import { ChatEntity } from '../entities/chat'
import { ChatType } from '@modules/messaging'
import { imageMimeTypes, videoMimeTypes } from '@stranerd/validate'

const searchFields = ['body', 'media.name']
type Library = 'images' | 'videos' | 'docs' | 'links'

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

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (!entity.data.members.includes(path[0])) return false
			if (entity.isClasses(entity) && entity.to !== path[1]) return false
			if (entity.isPersonal(entity) && !entity.data.members.includes(path[1])) return false
			if (date) return entity.createdAt >= date
			else return true
		})
	}

	getClassLibraryCondition (type: Library) {
		if (type === 'links') return [{ field: 'links.0', condition: Conditions.exists, value: true }]
		if (type === 'images') return [{ field: 'media.type', condition: Conditions.in, value: imageMimeTypes }]
		if (type === 'videos') return [{ field: 'media.type', condition: Conditions.in, value: videoMimeTypes }]
		return [
			{ field: 'media', condition: Conditions.ne, value: null },
			{ field: 'media.type', condition: Conditions.nin, value: [...imageMimeTypes, ...videoMimeTypes] }
		]
	}

	async getClassLibrary (classId: string, type: Library, groupId?: string, date?: number) {
		const conditions: QueryParams = {
			where: [
				{ field: 'data.classId', value: classId },
				{ field: 'data.type', value: ChatType.classes },
				...this.getClassLibraryCondition(type)
			],
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (groupId) conditions.where!.push({ field: 'to', value: groupId })
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async searchClassLibrary (classId: string, type: Library, search: string, groupId?: string) {
		const query: QueryParams = {
			where: [
				{ field: 'data.classId', value: classId },
				{ field: 'data.type', value: ChatType.classes },
				...this.getClassLibraryCondition(type)
			],
			all: true,
			search: { value: search, fields: searchFields }
		}

		if (groupId) query.where!.push({ field: 'to', value: groupId })

		return (await this.repository.get(query)).results
	}

	async listenToClassLibrary (classId: string, type: Library, listener: Listeners<ChatEntity>, groupId?: string, date?: number) {
		const conditions: QueryParams = {
			where: [
				{ field: 'data.classId', value: classId },
				{ field: 'data.type', value: ChatType.classes },
				...this.getClassLibraryCondition(type)
			],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (groupId) conditions.where!.push({ field: 'to', value: groupId })
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, ((entity) => {
			if (!(entity.isClasses(entity) && entity.data.classId === classId)) return false
			if (groupId && entity.to !== groupId) return false
			if (type === 'links' && entity.links.length > 0) return true
			if (type === 'images' && entity.isImage) return true
			if (type === 'videos' && entity.isVideo) return true
			if (type === 'docs' && entity.isDoc) return true
			return false
		}))
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
