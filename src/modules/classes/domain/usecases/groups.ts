import { IGroupRepository } from '../irepositories/igroup'
import { GroupFactory } from '../factories/group'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { GroupEntity } from '../entities/group'

export class GroupsUseCase {
	private repository: IGroupRepository

	constructor (repository: IGroupRepository) {
		this.repository = repository
	}

	async add (factory: GroupFactory) {
		const data = await factory.toModel()
		return await this.repository.add(data.classId, data)
	}

	async delete (classId: string, id: string) {
		return await this.repository.delete(classId, id)
	}

	async find (classId: string, id: string) {
		return await this.repository.find(classId, id)
	}

	async getClassGroups (classId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(classId, conditions)
	}

	async listenToOne (classId: string, id: string, listener: Listeners<GroupEntity>) {
		return await this.repository.listenToOne(classId, id, listener)
	}

	async listenToClassGroups (classId: string, listener: Listeners<GroupEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(classId, conditions, listener, (entity) => {
			if (entity.classId !== classId) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}

	async update (id: string, factory: GroupFactory) {
		const data = await factory.toModel()
		return await this.repository.update(data.classId, id, data)
	}
}
