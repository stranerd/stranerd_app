import { MethodFromModel } from '../models/method'
import { MethodEntity } from '../../domain/entities/method'

export class MethodTransformer {
	fromJSON (model: MethodFromModel) {
		const {
			id, data, token, userId, primary, createdAt, updatedAt
		} = model
		return new MethodEntity({
			id, data, token, userId, primary, createdAt, updatedAt
		})
	}

	toJSON (entity: MethodEntity) {
		return {}
	}
}
