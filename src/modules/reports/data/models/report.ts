import { ReportData, ReportType } from '../../domain/entities/report'
import { EmbeddedUser } from '@modules/users'

export interface ReportFromModel extends Omit<ReportToModel, 'type'> {
	id: string
	data: ReportData
	user: EmbeddedUser
	reportedId: string
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	type: ReportType
	reportedId: string
	message: string
}
