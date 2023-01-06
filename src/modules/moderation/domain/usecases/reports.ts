import { IReportRepository } from '../irepositories/ireport'
import { ReportFactory } from '../factories/report'
import { Conditions, Listeners, QueryParams } from '@modules/core'
import { PAGINATION_LIMIT } from '@utils/constants'
import { ReportEntity } from '../entities/report'

export class ReportsUseCase {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async add (factory: ReportFactory) {
		return await this.repository.add(await factory.toModel())
	}

	async delete (id: string) {
		return await this.repository.delete(id)
	}

	async get (date?: number) {
		const conditions: QueryParams = {
			sort: [{ field: 'createdAt', desc: true }],
			limit: PAGINATION_LIMIT
		}
		if (date) conditions.where!.push({ field: 'createdAt', condition: Conditions.lt, value: date })
		return await this.repository.get(conditions)
	}

	async listenToReport (id: string, listeners: Listeners<ReportEntity>) {
		return await this.repository.listenToOne(id, listeners)
	}

	async listenToReports (listener: Listeners<ReportEntity>, date?: number) {
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
