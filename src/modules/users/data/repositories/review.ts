import { Listeners, QueryParams } from '@modules/core'
import { IReviewRepository } from '../../domain/irepositories/ireview'
import { ReviewBaseDataSource } from '../datasources/review-base'
import { ReviewTransformer } from '../transformers/review'
import { ReviewToModel } from '../models/review'
import { ReviewEntity } from '../../domain/entities/review'

export class ReviewRepository implements IReviewRepository {
	private dataSource: ReviewBaseDataSource
	private transformer: ReviewTransformer

	constructor (dataSource: ReviewBaseDataSource, transformer: ReviewTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async create (data: ReviewToModel) {
		return this.dataSource.create(data)
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (userId: string, id: string, listener: Listeners<ReviewEntity>) {
		return this.dataSource.listenToOne(userId, id, {
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

	async listenToMany (userId: string, query: QueryParams, listener: Listeners<ReviewEntity>, matches: (entity: ReviewEntity) => boolean) {
		return this.dataSource.listenToMany(userId, query, {
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
}
