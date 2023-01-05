import { IUserRepository } from '../irepositories/iuser'
import { RankingTimes } from '../types'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { UserEntity } from '../entities/user'
import { UserSchoolFactory } from '../factories/userSchool'
import { PAGINATION_LIMIT } from '@utils/constants'

const searchFields = ['bio.firstName', 'bio.lastName', 'bio.fullName', 'bio.email']

export class UsersUseCase {
	private repository: IUserRepository

	constructor (repository: IUserRepository) {
		this.repository = repository
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async getAllAdmins () {
		return await this.repository.get({
			where: [{ field: 'roles.isStranerdAdmin', value: true }]
		})
	}

	async getAllTutors () {
		return await this.repository.get({
			where: [{ field: 'roles.isStranerdTutor', value: true }],
			all: true
		})
	}

	async getLeaderboard (type: RankingTimes, tagId: string | null, page: number) {
		const conditions: QueryParams = {
			where: [{ field: `account.rankings.${type}.value`, condition: Conditions.gt, value: 0 }],
			sort: [
				{ field: `account.rankings.${type}.value`, desc: true },
				{ field: `account.rankings.${type}.lastUpdatedAt`, desc: false }
			],
			limit: 50, page
		}
		if (tagId) conditions.where!.push({ field: 'school.tagId', value: tagId })

		return await this.repository.get(conditions)
	}

	async getUsersInList (ids: string[]) {
		const users = await this.repository.get({
			where: [{ field: 'id', value: ids, condition: Conditions.in }],
			all: true
		})
		return users.results
	}

	async listenToAllAdmins (listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'roles.isStranerdAdmin', value: true }],
			all: true
		}, listener, (entity) => entity.roles.isStranerdAdmin)
	}

	async listenToAllTutors (listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'roles.isStranerdTutor', value: true }],
			all: true
		}, listener, (entity) => entity.roles.isStranerdTutor)
	}

	async listenToOne (id: string, listeners: Listeners<UserEntity>) {
		return await this.repository.listenToOne(id, listeners)
	}

	async listenToUsersInList (ids: string[], listener: Listeners<UserEntity>) {
		return await this.repository.listenToMany({
			where: [{ field: 'id', value: ids, condition: Conditions.in }],
			all: true
		}, listener, (entity) => ids.includes(entity.id))
	}

	async search (detail: string) {
		const query: QueryParams = {
			all: true, search: { value: detail, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}

	async searchExplore () {
		const query: QueryParams = {
			sort: [{ field: 'dates.createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		return (await this.repository.get(query)).results
	}

	async updateSchool (factory: UserSchoolFactory) {
		return await this.repository.updateSchool(await factory.toModel())
	}
}
