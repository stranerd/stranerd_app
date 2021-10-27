export interface TransactionFromModel extends TransactionToModel {
	id: string
	userId: string
	createdAt: number
	updatedAt: number
}

export interface TransactionToModel {
	isGold: boolean
	amount: number
	event: string
}
