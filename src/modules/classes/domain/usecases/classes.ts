import { IClassRepository } from '../irepositories/iclass'
import { ClassFactory } from '../factories/class'
import { ClassEntity, ClassUsers } from '../entities/class'
import { Listeners, QueryKeys, QueryParams } from '@modules/core'
import { SEARCH_PAGINATION_LIMIT } from '@utils/constants'

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

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
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

	async search (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['name', 'description'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}

		return (await this.repository.get(query)).results
	}

	async update (id: string, factory: ClassFactory) {
		return await this.repository.update(id, await factory.toModel())
	}
}
