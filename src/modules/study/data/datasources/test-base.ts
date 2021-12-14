import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TestFromModel, TestToModel } from '../models/test'

export interface TestBaseDataSource {
	create: (data: TestToModel) => Promise<string>
	updateAnswer: (id: string, questionId: string, answer: number | string) => Promise<void>
	end: (id: string) => Promise<void>
	get: (query: QueryParams) => Promise<QueryResults<TestFromModel>>
	listenToOne: (id: string, listener: Listeners<TestFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TestFromModel>) => Promise<() => void>
	find: (id: string) => Promise<TestFromModel | null>
}
