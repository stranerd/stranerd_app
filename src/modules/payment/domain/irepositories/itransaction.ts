import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionEntity } from '../entities/transaction'
import { FlutterwaveSecrets, TransactionType } from '../types'

export interface ITransactionRepository {
	getFlutterwaveSecrets: () => Promise<FlutterwaveSecrets>
	get: (query: QueryParams) => Promise<QueryResults<TransactionEntity>>
	find: (id: string) => Promise<TransactionEntity | null>
	create: (type: TransactionType) => Promise<TransactionEntity>
	fulfill: (id: string) => Promise<void>
	listenToOne: (id: string, listener: Listeners<TransactionEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TransactionEntity>, matches: (entity: TransactionEntity) => boolean) => Promise<() => void>
}
