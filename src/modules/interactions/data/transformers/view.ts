import { ViewFromModel, ViewToModel } from '../models/view'
import { ViewEntity } from '../../domain/entities/view'

export class ViewTransformer {
	fromJSON (model: ViewFromModel) {
		const { id, entity, user, createdAt, updatedAt } = model
		return new ViewEntity({
			id, entity, user, createdAt, updatedAt
		})
	}

	toJSON (entity: ViewEntity): ViewToModel {
		return {
			entity: entity.entity
		}
	}
}
