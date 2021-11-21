import { Listeners, QueryParams } from '@modules/core'
import { IVideoCommentRepository } from '../../domain/irepositories/ivideoComment'
import { VideoCommentEntity } from '../../domain/entities/videoComment'
import { VideoCommentBaseDataSource } from '../datasources/videoComment-base'
import { VideoCommentTransformer } from '../transformers/videoComment'
import { VideoCommentToModel } from '../models/videoComment'

export class VideoCommentRepository implements IVideoCommentRepository {
	private dataSource: VideoCommentBaseDataSource
	private transformer: VideoCommentTransformer

	constructor (dataSource: VideoCommentBaseDataSource, transformer: VideoCommentTransformer) {
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

	async listenToOne (id: string, listener: Listeners<VideoCommentEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<VideoCommentEntity>, matches: (entity: VideoCommentEntity) => boolean) {
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

	async add (data: VideoCommentToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: VideoCommentToModel) {
		return this.dataSource.update(id, data)
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
