import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { QuestionEntity } from '../entities/question'
import { QuestionFromModel, QuestionToModel } from '../../data/models/question'

export interface IQuestionRepository {
	add: (data: QuestionToModel) => Promise<QuestionEntity>
	get: (query: QueryParams) => Promise<QueryResults<QuestionEntity>>
	listenToOne: (id: string, listener: Listeners<QuestionEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<QuestionEntity>, matches: (entity: QuestionEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<QuestionEntity | null>
	update: (id: string, data: QuestionToModel) => Promise<QuestionEntity>
	delete: (id: string) => Promise<void>
	markBestAnswer: (questionId: string, answerId: string) => Promise<void>
}
