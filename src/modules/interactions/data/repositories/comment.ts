import { Listeners, QueryParams } from '@modules/core'
import { ICommentRepository } from '../../domain/irepositories/icomment'
import { CommentEntity } from '../../domain/entities/comment'
import { CommentBaseDataSource } from '../datasources/comment-base'
import { CommentTransformer } from '../transformers/comment'
import { CommentToModel } from '../models/comment'
import { InteractionEntity } from '../../domain/types'

export class CommentRepository implements ICommentRepository {
	private dataSource: CommentBaseDataSource
	private transformer: CommentTransformer

	constructor (dataSource: CommentBaseDataSource, transformer: CommentTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (entity: InteractionEntity, query: QueryParams) {
		const models = await this.dataSource.get(entity, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<CommentEntity>) {
		return this.dataSource.listenToOne(entity, id, {
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

	async listenToMany (entity: InteractionEntity,  query: QueryParams, listener: Listeners<CommentEntity>, matches: (entity: CommentEntity) => boolean) {
		return this.dataSource.listenToMany(entity, query, {
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
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (entity: InteractionEntity,  id: string) {
		const model = await this.dataSource.find(entity, id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async update (id: string, data: CommentToModel) {
		return this.transformer.fromJSON(await this.dataSource.update(id, data))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
