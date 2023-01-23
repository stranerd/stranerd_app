import { Listeners, QueryParams, QueryResults } from '@modules/core'
import { ReportEntity } from '../entities/report'
import { ReportToModel } from '../../data/models/report'

export interface IReportRepository {
	add: (data: ReportToModel) => Promise<ReportEntity>,
	find: (id: string) => Promise<ReportEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<ReportEntity>>
	listenToOne: (id: string, listener: Listeners<ReportEntity>) => Promise<() => void>
	listenToMany: (queryParams: QueryParams, listener: Listeners<ReportEntity>, matches: (entity: ReportEntity) => boolean) => Promise<() => void>
	delete: (id: string) => Promise<void>
}
