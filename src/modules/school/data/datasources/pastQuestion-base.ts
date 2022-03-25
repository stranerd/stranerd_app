import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { PastQuestionFromModel, PastQuestionToModel } from '../models/pastQuestion'

export interface PastQuestionBaseDataSource {
	create: (data: PastQuestionToModel) => Promise<PastQuestionFromModel>
	update: (id: string, data: PastQuestionToModel) => Promise<PastQuestionFromModel>
	get: (query: QueryParams) => Promise<QueryResults<PastQuestionFromModel>>
	listenToOne: (id: string, listener: Listeners<PastQuestionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<PastQuestionFromModel>) => Promise<() => void>
	find: (id: string) => Promise<PastQuestionFromModel | null>
	delete: (id: string) => Promise<void>
}
