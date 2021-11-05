import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'

export interface TransactionBaseDataSource {
	find: (userId: string, id: string) => Promise<TransactionFromModel | null>
	get: (userId: string, query: QueryParams) => Promise<QueryResults<TransactionFromModel>>
	listenToMany: (user: string, query: QueryParams, listener: Listeners<TransactionFromModel>) => Promise<() => void>
	listenToOne: (user: string, id: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
}
