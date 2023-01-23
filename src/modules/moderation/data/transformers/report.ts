import { ReportFromModel, ReportToModel } from '../models/report'
import { ReportEntity } from '../../domain/entities/report'

export class ReportTransformer {
	fromJSON (model: ReportFromModel) {
		const { id, entity, user, message, createdAt, updatedAt } = model
		return new ReportEntity({
			id, entity, user, message, createdAt, updatedAt
		})
	}

	toJSON (entity: ReportEntity): ReportToModel {
		return {
			entity: entity.entity,
			message: entity.message
		}
	}
}
