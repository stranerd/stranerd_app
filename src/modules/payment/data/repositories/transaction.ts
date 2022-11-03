import { Listeners, QueryParams } from '@modules/core'
import { ITransactionRepository } from '../../domain/irepositories/itransaction'
import { TransactionEntity } from '../../domain/entities/transaction'
import { TransactionBaseDataSource } from '../datasources/transactionBase'
import { TransactionTransformer } from '../transformers/transaction'
import { TransactionType } from '@modules/payment/domain/types'

export class TransactionRepository implements ITransactionRepository {
	private dataSource: TransactionBaseDataSource
	private transformer: TransactionTransformer

	constructor (dataSource: TransactionBaseDataSource, transformer: TransactionTransformer) {
		this.dataSource = dataSource
		this.transformer = transformer
	}

	async getFlutterwaveSecrets () {
		return await this.dataSource.getFlutterwaveSecrets()
	}

	async create (type: TransactionType) {
		return this.transformer.fromJSON(await this.dataSource.create(type))
	}

	async get (query: QueryParams) {
		const models = await this.dataSource.get(query)
		return {
			...models,
			results: models.results.map(this.transformer.fromJSON)
		}
	}

	async listenToOne (id: string, listener: Listeners<TransactionEntity>) {
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

	async listenToMany (query: QueryParams, listener: Listeners<TransactionEntity>, matches: (entity: TransactionEntity) => boolean) {
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

	async fulfill (id: string) {
		return await this.dataSource.fulfill(id)
	}
}
