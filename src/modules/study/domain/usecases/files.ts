import { IFileRepository } from '../irepositories/ifile'
import { FileFactory } from '../factories/file'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { FileEntity } from '../entities/file'
import { imageMimeTypes, videoMimeTypes } from '@stranerd/validate'

const searchFields = ['title', 'media.name']
type Library = 'images' | 'videos' | 'docs'

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

	async getInList (ids: string[]) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<FileEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listenInList (ids: string[], listener: Listeners<FileEntity>) {
		const conditions: QueryParams = {
			where: [{ field: 'id', condition: Conditions.in, value: ids }],
			all: true
		}

		return await this.repository.listenToMany(conditions, listener, (entity) => ids.includes(entity.id))
	}

	async search (detail: string) {
		const query: QueryParams = {
			all: true, search: { value: detail, fields: searchFields }
		}
		return (await this.repository.get(query)).results
	}

	getConditions (type: Library) {
		if (type === 'images') return [{ field: 'media.type', condition: Conditions.in, value: imageMimeTypes }]
		if (type === 'videos') return [{ field: 'media.type', condition: Conditions.in, value: videoMimeTypes }]
		return [{ field: 'media.type', condition: Conditions.nin, value: [...imageMimeTypes, ...videoMimeTypes] }]
	}

	async getUserFiles (userId: string, type: Library, date?: number) {
		const conditions: QueryParams = {
			where: [
				{ field: 'user.id', value: userId },
				...this.getConditions(type)
			],
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })

		return await this.repository.get(conditions)
	}

	async searchUserFiles (userId: string, type: Library, search: string) {
		const query: QueryParams = {
			where: [
				{ field: 'user.id', value: userId },
				...this.getConditions(type)
			],
			all: true,
			search: { value: search, fields: searchFields }
		}

		return (await this.repository.get(query)).results
	}

	async listenToUserFiles (userId: string, type: Library, listener: Listeners<FileEntity>, date?: number) {
		const conditions: QueryParams = {
			where: [
				{ field: 'user.id', value: userId },
				...this.getConditions(type)
			],
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}

		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, ((entity) => {
			if (entity.user.id !== userId) return false
			if (type === 'images' && entity.isImage) return true
			if (type === 'videos' && entity.isVideo) return true
			return type === 'docs' && entity.isDoc
		}))
	}
}
