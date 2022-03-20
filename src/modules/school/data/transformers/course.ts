import { CourseFromModel, CourseToModel } from '../models/course'
import { CourseEntity } from '../../domain/entities/course'

export class CourseTransformer {
	fromJSON (model: CourseFromModel) {
		const { id, name, institutionId, facultyId, departmentId, createdAt, updatedAt } = model
		return new CourseEntity({
			id, name, institutionId, facultyId, departmentId, createdAt, updatedAt
		})
	}

	toJSON (entity: CourseEntity): CourseToModel {
		return {
			name: entity.name,
			institutionId: entity.institutionId,
			departmentId: entity.departmentId
		}
	}
}
