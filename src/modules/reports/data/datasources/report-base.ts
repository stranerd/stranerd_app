import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReportFromModel, ReportToModel } from '../models/report'

export interface ReportBaseDataSource {
	create: (data: ReportToModel) => Promise<string>
	get: (query: QueryParams) => Promise<QueryResults<ReportFromModel>>
	find: (id: string) => Promise<ReportFromModel | null>
	delete: (id: string) => Promise<void>
	listenToMany: (query: QueryParams, listener: Listeners<ReportFromModel>) => Promise<() => void>
	listenToOne: (id: string, listener: Listeners<ReportFromModel>) => Promise<() => void>
}
