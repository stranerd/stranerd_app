import { TransactionFromModel } from '../models/transaction'
import { TransactionEntity } from '../../domain/entities/transaction'

export class TransactionTransformer {
	fromJSON (model: TransactionFromModel) {
		const {
			id, userId, email, title, amount, currency, status, data,
			createdAt, updatedAt
		} = model
		return new TransactionEntity({
			id, userId, email, title, amount, currency, status, data,
			createdAt, updatedAt
		})
	}

	toJSON (entity: TransactionEntity) {
		return {}
	}
}
