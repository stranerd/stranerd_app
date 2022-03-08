import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { QuestionFromModel, QuestionToModel } from '../models/question'

export interface QuestionBaseDataSource {
	create: (data: QuestionToModel) => Promise<QuestionFromModel>
	update: (id: string, data: QuestionToModel) => Promise<QuestionFromModel>
	get: (query: QueryParams) => Promise<QueryResults<QuestionFromModel>>
	listenToOne: (id: string, listener: Listeners<QuestionFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<QuestionFromModel>) => Promise<() => void>
	find: (id: string) => Promise<QuestionFromModel | null>
	delete: (id: string) => Promise<void>
	markBestAnswer: (questionId: string, answerId: string) => Promise<void>
}
