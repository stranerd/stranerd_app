import { Listeners } from '@modules/core'
import { IReportRepository } from '../irepositories/ireport'
import { ReportEntity, Type } from '../entities/report'

export class ListenToReportUseCase<T extends Type> {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (id: string, listeners: Listeners<ReportEntity<T>>) {
		return await this.repository.listenToOne(id, listeners)
	}
}
