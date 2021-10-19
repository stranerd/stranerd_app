import { TransactionFromModel } from '../models/transaction'
import { TransactionEntity } from '../../domain/entities/transaction'

export class TransactionTransformer {
	fromJSON (model: TransactionFromModel) {
		const { id, userId, isGold, event, amount, createdAt, updatedAt } = model
		return new TransactionEntity({
			id, userId, event, amount, isGold,
			createdAt, updatedAt
		})
	}
}
