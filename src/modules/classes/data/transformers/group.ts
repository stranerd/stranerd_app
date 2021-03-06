import { GroupFromModel, GroupToModel } from '../models/group'
import { GroupEntity } from '../../domain/entities/group'

export class GroupTransformer {
	fromJSON (model: GroupFromModel) {
		const { id, name, user, users, createdAt, classId, updatedAt } = model
		return new GroupEntity({
			id, name, user, users, classId, createdAt, updatedAt
		})
	}

	toJSON (entity: GroupEntity): GroupToModel {
		return {
			name: entity.name,
			classId: entity.classId
		}
	}
}
