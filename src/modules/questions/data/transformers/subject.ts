import { SubjectFromModel, SubjectToModel } from '../models/subject'
import { SubjectEntity } from '../../domain/entities/subject'

export class SubjectTransformer {
	fromJSON (model: SubjectFromModel) {
		const { id, name, createdAt, updatedAt } = model
		return new SubjectEntity({
			id, name, createdAt, updatedAt
		})
	}

	toJSON (entity: SubjectEntity): SubjectToModel {
		return {
			name: entity.name
		}
	}
}
