import { FacultyFromModel, FacultyToModel } from '../models/faculty'
import { FacultyEntity } from '../../domain/entities/faculty'

export class FacultyTransformer {
	fromJSON (model: FacultyFromModel) {
		const { id, name, institutionId, createdAt, updatedAt } = model
		return new FacultyEntity({
			id, name, institutionId, createdAt, updatedAt
		})
	}

	toJSON (entity: FacultyEntity): FacultyToModel {
		return {
			name: entity.name,
			institutionId: entity.institutionId
		}
	}
}
