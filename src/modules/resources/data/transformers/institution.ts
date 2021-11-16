import { InstitutionFromModel, InstitutionToModel } from '../models/institution'
import { InstitutionEntity } from '../../domain/entities/institution'

export class InstitutionTransformer {
	fromJSON (model: InstitutionFromModel) {
		const { id, name, createdAt, updatedAt } = model
		return new InstitutionEntity({
			id, name, createdAt, updatedAt
		})
	}

	toJSON (entity: InstitutionEntity): InstitutionToModel {
		return {
			name: entity.name
		}
	}
}
