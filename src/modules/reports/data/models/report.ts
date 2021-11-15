import { UserBio } from '@modules/users'
import { ReportType } from '../../domain/entities/report'

export interface ReportFromModel extends ReportToModel {
	id: string
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reported: Record<string, any>
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	type: ReportType
	reportedId: string
	message: string
}
