import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { TestPrepFromModel, TestPrepToModel } from '../models/testPrep'

export interface TestPrepBaseDataSource {
	create: (data: TestPrepToModel) => Promise<TestPrepFromModel>
	update: (id: string, data: TestPrepToModel) => Promise<TestPrepFromModel>
	get: (query: QueryParams) => Promise<QueryResults<TestPrepFromModel>>
	listenToOne: (id: string, listener: Listeners<TestPrepFromModel>) => Promise<() => void>
	listenToMany: (query: QueryParams, listener: Listeners<TestPrepFromModel>) => Promise<() => void>
	find: (id: string) => Promise<TestPrepFromModel | null>
	delete: (id: string) => Promise<void>
}
