import { Listeners, QueryParams } from '@modules/core'
import { ITransactionRepository } from '../../domain/irepositories/itransaction'
import { TransactionBaseDataSource } from '../datasources/transaction-base'
import { TransactionTransformer } from '../transformers/transaction'
import { TransactionEntity } from '../../domain/entities/transaction'

export class TransactionRepository implements ITransactionRepository {
	private readonly dataSource: TransactionBaseDataSource
	private readonly transformer: TransactionTransformer

	constructor (dataSource: TransactionBaseDataSource, transformer: TransactionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async get (userId: string, query: QueryParams) {
		const models = await this.dataSource.get(userId, query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (userId: string, id: string, listener: Listeners<TransactionEntity>) {
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

	async listenToMany (userId: string, query: QueryParams, listener: Listeners<TransactionEntity>, matches: (entity: TransactionEntity) => boolean) {
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
