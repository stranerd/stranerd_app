import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'

export interface FlashCardBaseDataSource {
	create: (data: FlashCardToModel) => Promise<string>
	update: (id: string, data: FlashCardToModel) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<FlashCardFromModel>>
	listenToOne: (id: string, listener: Listeners<FlashCardFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FlashCardFromModel>) => Promise<() => void>
	find: (id: string) => Promise<FlashCardFromModel | null>
	delete: (id: string) => Promise<void>
}
