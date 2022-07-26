import { Currencies, TransactionData, TransactionStatus } from '../../domain/types'

export interface TransactionFromModel {
	id: string
	userId: string
	email: string
	title: string
	amount: number
	currency: Currencies
	status: TransactionStatus
	data: TransactionData
	createdAt: number
	updatedAt: number
}
