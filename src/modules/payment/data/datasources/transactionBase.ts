import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TransactionFromModel } from '../models/transaction'
import { FlutterwaveSecrets, TransactionType } from '../../domain/types'

export interface TransactionBaseDataSource {
	getFlutterwaveSecrets: () => Promise<FlutterwaveSecrets>
	get: (query: QueryParams) => Promise<QueryResults<TransactionFromModel>>
	find: (id: string) => Promise<TransactionFromModel | null>
	create: (type: TransactionType) => Promise<TransactionFromModel>
	fulfill: (id: string) => Promise<boolean>
	listenToOne: (id: string, listener: Listeners<TransactionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TransactionFromModel>) => Promise<() => void>
}
