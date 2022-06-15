import { Listeners, QueryParams } from '@modules/core'
import { IViewRepository } from '../../domain/irepositories/iview'
import { ViewEntity } from '../../domain/entities/view'
import { ViewBaseDataSource } from '../datasources/view-base'
import { ViewTransformer } from '../transformers/view'
import { ViewToModel } from '../models/view'
import { InteractionEntity } from '../../domain/types'

export class ViewRepository implements IViewRepository {
	private dataSource: ViewBaseDataSource
	private transformer: ViewTransformer

	constructor (dataSource: ViewBaseDataSource, transformer: ViewTransformer) {
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

	async listenToOne (entity: InteractionEntity, id: string, listener: Listeners<ViewEntity>) {
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

	async listenToMany (entity: InteractionEntity, query: QueryParams, listener: Listeners<ViewEntity>, matches: (entity: ViewEntity) => boolean) {
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

	async add (data: ViewToModel) {
		return this.transformer.fromJSON(await this.dataSource.create(data))
	}

	async find (entity: InteractionEntity, id: string) {
		const model = await this.dataSource.find(entity, id)
		return model ? this.transformer.fromJSON(model) : null
	}
}
