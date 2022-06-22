import { DepartmentFromModel, DepartmentToModel } from '../models/department'
import { DepartmentEntity } from '../../domain/entities/department'

export class DepartmentTransformer {
	fromJSON (model: DepartmentFromModel) {
		const { id, name, institutionId, facultyId, tagId, createdAt, updatedAt } = model
		return new DepartmentEntity({
			id, name, institutionId, facultyId, tagId, createdAt, updatedAt
		})
	}

	toJSON (entity: DepartmentEntity): DepartmentToModel {
		return {
			name: entity.name,
			facultyId: entity.facultyId,
			tagId: entity.tagId
		}
	}
}
