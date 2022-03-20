import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { PastQuestionEntity } from '../entities/pastQuestion'
import { PastQuestionToModel } from '../../data/models/pastQuestion'

export interface IPastQuestionRepository {
	add: (data: PastQuestionToModel) => Promise<PastQuestionEntity>
	get: (query: QueryParams) => Promise<QueryResults<PastQuestionEntity>>
	listenToOne: (id: string, listener: Listeners<PastQuestionEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<PastQuestionEntity>, matches: (entity: PastQuestionEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<PastQuestionEntity | null>
	update: (id: string, data: PastQuestionToModel) => Promise<PastQuestionEntity>
	delete: (id: string) => Promise<void>
}
