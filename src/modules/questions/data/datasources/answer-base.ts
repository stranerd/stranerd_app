import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { AnswerFromModel, AnswerToModel } from '../models/answer'

export interface AnswerBaseDataSource {
	create: (data: AnswerToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<AnswerFromModel>>
	listenToOne: (id: string, listener: Listeners<AnswerFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<AnswerFromModel>) => Promise<() => void>
	find: (id: string) => Promise<AnswerFromModel | null>
	update: (id: string, data: AnswerToModel) => Promise<void>
	delete: (id: string) => Promise<void>
	vote: (id: string, userId: string, vote: boolean) => Promise<void>
}
