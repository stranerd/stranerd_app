import { IClassRepository } from '../irepositories/iclass'
import { ClassFactory } from '../factories/class'
import { ClassEntity } from '../entities/class'
import { Listeners, QueryKeys, QueryParams } from '@modules/core'
import { ClassUsers } from '../types'
import { PAGINATION_LIMIT } from '@utils/constants'

const searchFields = ['name', 'description']

export class ClassesUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async add (factory: ClassFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async addMembers (id: string, userIds: string[], add: boolean) {
		return await this.repository.addMembers(id, userIds, add)
	}

	async acceptRequest (id: string, userId: string, accept: boolean) {
		return await this.repository.acceptRequest(id, userId, accept)
	}

	async changeMemberRole (id: string, userId: string, role: ClassUsers, add: boolean) {
		return await this.repository.changeMemberRole(id, userId, role, add)
	}

	async update (id: string, factory: ClassFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async findBySchool (departmentId: string, year: number) {
		const conditions: QueryParams = {
			where: [
				{ field: 'school.departmentId', value: departmentId },
				{ field: 'school.year', value: year }
			],
			limit: 1
		}
		const { results } = await this.repository.get(conditions)
		return results.at(0) ?? null
	}

	async getMyClasses (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: `users.${ClassUsers.members}`, value: userId }, { field: 'requests', value: userId }],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async leaveClass (id: string) {
		return await this.repository.leaveClass(id)
	}

	async listenToOne (id: string, listener: Listeners<ClassEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listenToMyClasses (userId: string, listener: Listeners<ClassEntity>) {
		const conditions: QueryParams = {
			where: [{ field: `users.${ClassUsers.members}`, value: userId }, { field: 'requests', value: userId }],
			whereType: QueryKeys.or,
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.users[ClassUsers.members].includes(userId)
		})
	}

	async requestClass (id: string, request: boolean) {
		return await this.repository.requestClass(id, request)
	}

	async getDepartmentClasses (departmentId?: string) {
		const conditions: QueryParams = departmentId ? {
			where: [{ field: 'school.departmentId', value: departmentId }],
			all: true
		} : {
			sort: [{ field: 'createdAt', desc: true }],
			limit: 5
		}
		return await this.repository.get(conditions)
	}

	async search (detail: string) {
		const query: QueryParams = {
			all: true, search: { value: detail, fields: searchFields }
		}

		return (await this.repository.get(query)).results
	}

	async searchExplore () {
		const query: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		return (await this.repository.get(query)).results
	}
}
