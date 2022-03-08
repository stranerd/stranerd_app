import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { FlashCardEntity } from '../entities/flashCard'
import { FlashCardToModel } from '../../data/models/flashCard'

export interface IFlashCardRepository {
	add: (data: FlashCardToModel) => Promise<FlashCardEntity>
	get: (query: QueryParams) => Promise<QueryResults<FlashCardEntity>>
	listenToOne: (id: string, listener: Listeners<FlashCardEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<FlashCardEntity>, matches: (entity: FlashCardEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<FlashCardEntity | null>
	update: (id: string, data: FlashCardToModel) => Promise<FlashCardEntity>
	delete: (id: string) => Promise<void>
}
