import { InstitutionFromModel, InstitutionToModel } from '../models/institution'
import { InstitutionEntity } from '../../domain/entities/institution'

export class InstitutionTransformer {
	fromJSON (model: InstitutionFromModel) {
		const { id, name, isSchool, isGateway, createdAt, updatedAt } = model
		return new InstitutionEntity({
			id, name, isSchool, isGateway, createdAt, updatedAt
		})
	}

	toJSON (entity: InstitutionEntity): InstitutionToModel {
		return {
			name: entity.name,
			isSchool: entity.isSchool,
			isGateway: entity.isGateway
		}
	}
}
