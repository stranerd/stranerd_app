import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity } from '../entities/report'

export class ListenToReportsUseCase {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (listener: Listeners<ReportEntity>, date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			all: true
		}
		if (date) conditions.where = [{ field: 'createdAt', condition: Conditions.gt, value: date }]

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (date) return entity.createdAt >= date
			return true
		})
	}
}
