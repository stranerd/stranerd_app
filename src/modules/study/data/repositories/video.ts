import { Listeners, QueryParams } from '@modules/core'
import { IVideoRepository } from '../../domain/irepositories/ivideo'
import { VideoEntity } from '../../domain/entities/video'
import { VideoBaseDataSource } from '../datasources/video-base'
import { VideoTransformer } from '../transformers/video'
import { VideoToModel } from '../models/video'

export class VideoRepository implements IVideoRepository {
	private dataSource: VideoBaseDataSource
	private transformer: VideoTransformer

	constructor (dataSource: VideoBaseDataSource, transformer: VideoTransformer) {
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

	async listenToOne (id: string, listener: Listeners<VideoEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<VideoEntity>, matches: (entity: VideoEntity) => boolean) {
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

	async add (data: VideoToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: VideoToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
