import { IFileRepository } from '../irepositories/ifile'
import { FileFactory } from '../factories/file'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { FileEntity } from '../entities/file'

const searchFields = ['title', 'media.name']

export class FilesUseCase {
	private repository: IFileRepository

	constructor (repository: IFileRepository) {
		this.repository = repository
	}

	async add (factory: FileFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: FileFactory) {
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
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(conditions)
	}

	async getInList (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async getUserFiles (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<FileEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<FileEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}

	async listenInList (ids: string[], listener: Listeners<FileEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}

	async listenToUserFiles (userId: string, listener: Listeners<FileEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			const matches = [entity.user.id === userId]
			if (date) matches.push(entity.createdAt >= date)
			return matches.every((m) => m)
		})
	}

	async search (detail: string) {
		const query: QueryParams = {
			all: true, search: { value: detail, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}

	async searchUserFiles (userId: string, search: string) {
		const query = {
			where: [{ field: 'user.id', value: userId }],
			all: true, search: { value: search, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}
}
