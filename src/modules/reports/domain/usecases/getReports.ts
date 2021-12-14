import { Conditions, QueryParams, QueryResults } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, ReportType } from '../entities/report'

export class GetReportsUseCase {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (type: ReportType, date?: number): Promise<QueryResults<ReportEntity>> {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: -1 },
			limit: PAGINATION_LIMIT,
			where: [{ field: 'type', value: type }]
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })
		return await this.repository.get(conditions)
	}
}
