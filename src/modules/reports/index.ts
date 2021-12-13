import { ReportApiDataSource } from './data/datasources/report-api'
import { ReportTransformer } from './data/transformers/report'
import { ReportRepository } from './data/repositories/report'
import { AddReportUseCase } from './domain/usecases/addReport'
import { GetReportsUseCase } from './domain/usecases/getReports'
import { DeleteReportUseCase } from './domain/usecases/deleteReport'
import { ListenToReportsUseCase } from './domain/usecases/listenToReports'
import { ListenToReportUseCase } from './domain/usecases/listenToReport'

export { ReportFactory } from './domain/factories/report'
export { ReportType, ReportEntity } from './domain/entities/report'

const reportDataSource = new ReportApiDataSource()

const reportTransformer = new ReportTransformer()

const reportRepository = new ReportRepository(reportDataSource, reportTransformer)

export const AddReport = new AddReportUseCase(reportRepository)
export const GetReports = new GetReportsUseCase(reportRepository)
export const ListenToReports = new ListenToReportsUseCase(reportRepository)
export const ListenToReport = new ListenToReportUseCase(reportRepository)
export const DeleteReport = new DeleteReportUseCase(reportRepository)
