import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CardFromModel } from '../models/card'

export interface CardBaseDataSource {
	get: (query: QueryParams) => Promise<QueryResults<CardFromModel>>
	find: (id: string) => Promise<CardFromModel | null>
	makePrimary: (id: string) => Promise<CardFromModel>
	delete: (id: string) => Promise<void>
	listenToOne: (id: string, listener: Listeners<CardFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<CardFromModel>) => Promise<() => void>
}
