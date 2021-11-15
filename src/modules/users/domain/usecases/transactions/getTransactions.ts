import { Conditions, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { ITransactionRepository } from '../../irepositories/itransaction'

export class GetTransactionsUseCase {
	private readonly repository: ITransactionRepository

	constructor (repository: ITransactionRepository) {
		this.repository = repository
	}

	async call (userId: string, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.lt, value: date }]

		return this.repository.get(userId, conditions)
	}
}
