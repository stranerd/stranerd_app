import { ITransactionRepository } from '../irepositories/itransaction'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { TransactionEntity } from '../entities/transaction'
import { TransactionType } from '../types'

export class TransactionsUseCase {
	private repository: ITransactionRepository

	constructor (repository: ITransactionRepository) {
		this.repository = repository
	}

	async getFlutterwaveSecrets () {
		return this.repository.getFlutterwaveSecrets()
	}

	async create (type: TransactionType) {
		return await this.repository.create(type)
	}

	async fulfill (id: string) {
		return await this.repository.fulfill(id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return await this.repository.get(conditions)
	}

	async listenToOne (id: string, listener: Listeners<TransactionEntity>) {
		return await this.repository.listenToOne(id, listener)
	}

	async listen (listener: Listeners<TransactionEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
