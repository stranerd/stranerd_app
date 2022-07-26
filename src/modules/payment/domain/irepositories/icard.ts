import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { CardEntity } from '../entities/card'

export interface ICardRepository {
	get: (query: QueryParams) => Promise<QueryResults<CardEntity>>
	find: (id: string) => Promise<CardEntity | null>
	listenToOne: (id: string, listener: Listeners<CardEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<CardEntity>, matches: (entity: CardEntity) => boolean) => Promise<() => void>
	makePrimary: (id: string) => Promise<CardEntity>
	delete: (id: string) => Promise<void>
}
