import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TestPrepEntity } from '../entities/testPrep'
import { TestPrepToModel } from '../../data/models/testPrep'

export interface ITestPrepRepository {
	add: (data: TestPrepToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<TestPrepEntity>>
	listenToOne: (id: string, listener: Listeners<TestPrepEntity>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TestPrepEntity>, matches: (entity: TestPrepEntity) => boolean) => Promise<() => void>
	find: (id: string) => Promise<TestPrepEntity | null>
	update: (id: string, data: TestPrepToModel) => Promise<void>
	delete: (id: string) => Promise<void>
}
