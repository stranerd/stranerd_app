import { IVideoRepository } from '../irepositories/ivideo'
import { VideoFactory } from '../factories/video'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT, SEARCH_PAGINATION_LIMIT } from '@utils/constants'
import { VideoEntity } from '../entities/video'

export class VideosUseCase {
	private repository: IVideoRepository

	constructor (repository: IVideoRepository) {
		this.repository = repository
	}

	async add (factory: VideoFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: VideoFactory) {
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

	async getUserVideos (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT,
			where: [{ field: 'user.id', value: userId }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<VideoEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<VideoEntity>, date?: number) {
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

	async listenInList (ids: string[], listener: Listeners<VideoEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}

	async listenToUserVideos (userId: string, listener: Listeners<VideoEntity>, date?: number) {
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
		const query: QueryParams = detail ? {
			all: true,
			search: { value: detail, fields: ['title', 'description'] }
		} : {
			limit: SEARCH_PAGINATION_LIMIT,
			sort: [{ field: 'createdAt', desc: true }]
		}
		return (await this.repository.get(query)).results
	}
}
