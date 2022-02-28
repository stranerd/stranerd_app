import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, ReportType } from '../entities/report'

export class ListenToReportsUseCase {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (type: ReportType, listener: Listeners<ReportEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			where: [{ field: 'type', value: type }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (entity.data.type !== type) return false
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
