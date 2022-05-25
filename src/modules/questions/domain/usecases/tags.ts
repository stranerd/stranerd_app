import { ITagRepository } from '../irepositories/itag'
import { TagFactory } from '../factories/tag'
import { Listeners } from '@modules/core'
import { TagEntity } from '../entities/tag'

export class TagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async add (factory: TagFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async update (id: string, factory: TagFactory) {
		return await this.repository.update(id, await factory.toModel())
	}

	async getAllTags () {
		return await this.repository.get({ all: true })
	}

	async listenToAllTags (listener: Listeners<TagEntity>) {
		return await this.repository.listenToMany({ all: true }, listener, (entity) => !!entity)
	}
}
