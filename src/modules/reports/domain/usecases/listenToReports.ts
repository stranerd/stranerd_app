import { Conditions, Listeners, QueryParams } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, ReportType, Type } from '../entities/report'

export class ListenToReportsUseCase<T extends Type> {
	private repository: IReportRepository
	private readonly type: ReportType

	constructor (type: ReportType, repository: IReportRepository) {
		this.repository = repository
		this.type = type
	}

	async call (listener: Listeners<ReportEntity<T>>, date?: number) {
		const conditions: QueryParams = {
			sort: { field: 'createdAt', order: 1 },
			where: [{ field: 'type', value: this.type }],
			all: true
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.gt, value: date })

		return await this.repository.listenToMany(conditions, listener, (entity) => {
			if (entity.type !== this.type) return false
			if (date) return entity.createdAt > date
			return true
		})
	}
}
