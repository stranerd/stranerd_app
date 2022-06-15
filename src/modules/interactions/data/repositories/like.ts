import { Listeners, QueryParams } from '@modules/core'
import { ILikeRepository } from '../../domain/irepositories/ilike'
import { LikeEntity } from '../../domain/entities/like'
import { LikeBaseDataSource } from '../datasources/like-base'
import { LikeTransformer } from '../transformers/like'
import { LikeToModel } from '../models/like'
import { InteractionEntity } from '../../domain/types'

export class LikeRepository implements ILikeRepository {
	private dataSource: LikeBaseDataSource
	private transformer: LikeTransformer

	constructor (dataSource: LikeBaseDataSource, transformer: LikeTransformer) {
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

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<LikeEntity>) {
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

	async listenToMany (entity: InteractionEntity,  query: QueryParams, listener: Listeners<LikeEntity>, matches: (entity: LikeEntity) => boolean) {
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

	async add (data: LikeToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (entity: InteractionEntity,  id: string) {
		const model = await this.dataSource.find(entity, id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
