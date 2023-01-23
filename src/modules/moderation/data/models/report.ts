import { ReportData } from '../../domain/entities/report'
import { EmbeddedUser } from '@modules/users'

export interface ReportFromModel extends Omit<ReportToModel, 'type'> {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface ReportToModel {
	entity: ReportData
	message: string
}
