import { UserBio, UserRoles } from '@modules/users'
import { ReportData, ReportType } from '../../domain/entities/report'

export interface ReportFromModel extends Omit<ReportToModel, 'type'> {
	id: string
	data: ReportData
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reporterRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	type: ReportType
	reportedId: string
	message: string
}
