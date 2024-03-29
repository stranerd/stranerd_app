import { Listeners, QueryParams } from '@modules/core'
import { ITagRepository } from '../../domain/irepositories/itag'
import { TagEntity } from '../../domain/entities/tag'
import { TagBaseDataSource } from '../datasources/tagBase'
import { TagTransformer } from '../transformers/tag'
import { TagToModel } from '../models/tag'

export class TagRepository implements ITagRepository {
	private dataSource: TagBaseDataSource
	private transformer: TagTransformer

	constructor (dataSource: TagBaseDataSource, transformer: TagTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<TagEntity>) {
		return this.dataSource.listenToOne(id, {
			created: async (model) => {
				await listener.created(this.transformer.fromJSON(model))
			},
			updated: async (model) => {
				await listener.updated(this.transformer.fromJSON(model))
			},
			deleted: async (model) => {
				await listener.deleted(this.transformer.fromJSON(model))
			}
		})
	}

	async listenToMany (query: QueryParams, listener: Listeners<TagEntity>, matches: (entity: TagEntity) => boolean) {
		return this.dataSource.listenToMany(query, {
			created: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.created(entity)
			},
			updated: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.updated(entity)
			},
			deleted: async (model) => {
				const entity = this.transformer.fromJSON(model)
				if (matches(entity)) await listener.deleted(entity)
			}
		})
	}

	async add (data: TagToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: TagToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return await this.dataSource.delete(id)
	}
}
