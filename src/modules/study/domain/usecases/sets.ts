import { ISetRepository } from '../irepositories/iset'
import { SetFactory } from '../factories/set'
import { SetFromModel } from '../../data/models/set'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT, SEARCH_PAGINATION_LIMIT } from '@utils/constants'
import { SetEntity } from '../entities/set'

export class SetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async add (factory: SetFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async saveProp (setId: string, type: keyof SetFromModel['saved'], values: string[]) {
		return await this.repository.saveProp(setId, type, values)
	}

	async deleteProp (setId: string, type: keyof SetFromModel['saved'], values: string[]) {
		return await this.repository.deleteProp(setId, type, values)
	}

	async update (id: string, factory: SetFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async getInList (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async getUserSets (userId: string) {
		const conditions: QueryParams = {
			where: [{ field: 'user.id', value: userId }],
			sort: [{ field: 'createdAt' }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<SetEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<SetEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}

	async listenInList (ids: string[], listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}

	async listenToUserSets (userId: string, listener: Listeners<SetEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'user.id', value: userId }],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			return entity.user.id === userId
		})
	}

	async search (detail: string) {
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['name'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
