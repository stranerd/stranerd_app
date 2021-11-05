import { Conditions, QueryParams, QueryResults } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, ReportType, Type } from '../entities/report'

export class GetReportsUseCase<T extends Type> {
	private repository: IReportRepository
	private readonly type: ReportType

	constructor (type: ReportType, repository: IReportRepository) {
		this.repository = repository
		this.type = type
	}

	async call (date?: number): Promise<QueryResults<ReportEntity<T>>> {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT,
			where: [{ field: 'type', value: this.type }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })
		return await this.repository.get(conditions)
	}
}
