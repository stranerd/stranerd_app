import { Listeners, QueryParams } from '@modules/core'
import { ICardRepository } from '../../domain/irepositories/icard'
import { CardEntity } from '../../domain/entities/card'
import { CardBaseDataSource } from '../datasources/cardBase'
import { CardTransformer } from '../transformers/card'

export class CardRepository implements ICardRepository {
	private dataSource: CardBaseDataSource
	private transformer: CardTransformer

	constructor (dataSource: CardBaseDataSource, transformer: CardTransformer) {
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

	async listenToOne (id: string, listener: Listeners<CardEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<CardEntity>, matches: (entity: CardEntity) => boolean) {
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

	async find (id: string) {
		const model = await this.dataSource.find(id)
		return model ? this.transformer.fromJSON(model) : null
	}

	async makePrimary (id: string) {
		return this.transformer.fromJSON(await this.dataSource.makePrimary(id))
	}

	async delete (id: string) {
		return this.dataSource.delete(id)
	}
}
