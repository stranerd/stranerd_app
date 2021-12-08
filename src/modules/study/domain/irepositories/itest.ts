import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TestEntity } from '../entities/test'
import { TestToModel } from '../../data/models/test'

export interface ITestRepository {
	add: (data: TestToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<TestEntity>>
	listenToOne: (id: string, listener: Listeners<TestEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TestEntity>, matches: (entity: TestEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<TestEntity | null>
	updateAnswer: (id: string, questionId: string, answer: number | string) => Promise<void>
	end: (id: string) => Promise<void>
}
