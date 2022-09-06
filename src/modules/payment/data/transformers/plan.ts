import { PlanFromModel } from '../models/plan'
import { PlanEntity } from '../../domain/entities/plan'

export class PlanTransformer {
	fromJSON (model: PlanFromModel) {
		const {
			id, amount, currency, name, interval, active, data, features,
			createdAt, updatedAt
		} = model
		return new PlanEntity({
			id, amount, currency, name, interval, active, data, features,
			createdAt, updatedAt
		})
	}

	toJSON (entity: PlanEntity) {
		return {}
	}
}
