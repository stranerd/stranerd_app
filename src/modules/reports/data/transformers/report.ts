import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportTransformer {
	fromJSON (model: ReportFromModel) {
		const { id, data, user, reportedId, message, createdAt, updatedAt } = model
		return new ReportEntity({
			id, data, user, reportedId, message, createdAt, updatedAt
		})
	}

	toJSON (entity: ReportEntity): ReportToModel {
		return {
			type: entity.data.type,
			reportedId: entity.reportedId,
			message: entity.message
		}
	}
}
