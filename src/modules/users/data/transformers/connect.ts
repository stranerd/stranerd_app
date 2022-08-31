import { ConnectFromModel, ConnectToModel } from '../models/connect'
import { ConnectEntity } from '../../domain/entities/connect'

export class ConnectTransformer {
	fromJSON (model: ConnectFromModel) {
		const { id, from, to, pending, accepted, createdAt, updatedAt } = model
		return new ConnectEntity({
			id, from, to, pending, accepted, createdAt, updatedAt
		})
	}

	toJSON (entity: ConnectEntity): ConnectToModel {
		return {}
	}
}
