import { IReportRepository } from '../irepositories/ireport'
import { ReportFactory } from '../factories/report'

export class AddReportUseCase {
	private repository: IReportRepository

	constructor (repository: IReportRepository) {
		this.repository = repository
	}

	async call (factory: ReportFactory): Promise<string> {
		return await this.repository.add(await factory.toModel())
	}
}
