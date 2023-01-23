import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FlashCardFromModel, FlashCardToModel } from '../models/flashCard'

export interface FlashCardBaseDataSource {
	create: (data: FlashCardToModel) => Promise<FlashCardFromModel>
	update: (id: string, data: FlashCardToModel) => Promise<FlashCardFromModel>
	get: (query: QueryParams) => Promise<QueryResults<FlashCardFromModel>>
	listenToOne: (id: string, listener: Listeners<FlashCardFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FlashCardFromModel>) => Promise<() => void>
	find: (id: string) => Promise<FlashCardFromModel | null>
	delete: (id: string) => Promise<void>
	saveMatch: (id: string, time: number) => Promise<{ time: number, record: boolean }>
}
