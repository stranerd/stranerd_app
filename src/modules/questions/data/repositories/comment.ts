import { Listeners, QueryParams } from '@modules/core'
import { ICommentRepository } from '../../domain/irepositories/icomment'
import { CommentEntity } from '../../domain/entities/comment'
import { CommentBaseDataSource } from '../datasources/comment-base'
import { CommentTransformer } from '../transformers/comment'
import { CommentToModel } from '../models/comment'

export class CommentRepository implements ICommentRepository {
	private dataSource: CommentBaseDataSource
	private transformer: CommentTransformer

	constructor (dataSource: CommentBaseDataSource, transformer: CommentTransformer) {
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

	async listenToOne (id: string, listener: Listeners<CommentEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<CommentEntity>, matches: (entity: CommentEntity) => boolean) {
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

	async add (data: CommentToModel) {
		return await this.dataSource.create(data)
	}

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: CommentToModel) {
		return await this.dataSource.update(id, data)
	}
}
