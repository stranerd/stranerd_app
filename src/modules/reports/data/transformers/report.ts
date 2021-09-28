import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportTransformer {
	fromJSON (model: ReportFromModel) {
		const { id, type, reporterId, reportedId, reported, reporterBio, message, createdAt, updatedAt } = model
		return new ReportEntity({
			id, type,
			reporterId, reportedId, reported, reporterBio, message,
			createdAt, updatedAt
		})
	}

	toJSON (entity: ReportEntity<any>): ReportToModel {
		return {
			type: entity.type,
			reportedId: entity.reportedId,
			message: entity.message
		}
	}
}
