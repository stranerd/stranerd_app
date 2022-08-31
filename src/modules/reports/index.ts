import { ReportApiDataSource } from './data/datasources/report-api'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { ReportsUseCase } from './domain/usecases/reports'

export { ReportFactory } from './domain/factories/report'
export { ReportType, ReportEntity } from './domain/entities/report'

const reportDataSource = new ReportApiDataSource()

const reportTransformer = new ReportTransformer()

const reportRepository = new ReportRepository(reportDataSource, reportTransformer)

export const ReportsUseCases = new ReportsUseCase(reportRepository)
