import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnswerToModel } from '../../data/models/answer'
import { AnswerEntity } from '../entities/answer'

export interface IAnswerRepository {
	add: (data: AnswerToModel) => Promise<AnswerEntity>
	get: (query: QueryParams) => Promise<QueryResults<AnswerEntity>>
	listenToOne: (id: string, listener: Listeners<AnswerEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<AnswerEntity>, matches: (entity: AnswerEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<AnswerEntity | null>
	update: (id: string, data: AnswerToModel) => Promise<AnswerEntity>
	delete: (id: string) => Promise<void>
	vote: (id: string, vote: boolean) => Promise<void>
}
