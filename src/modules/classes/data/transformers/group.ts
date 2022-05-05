import { GroupFromModel, GroupToModel } from '../models/group'
import { GroupEntity } from '../../domain/entities/group'
import { DiscussionTransformer } from './discussion'

export class GroupTransformer {
	fromJSON (model: GroupFromModel) {
		const { id, name, last, user, users, createdAt, classId, updatedAt } = model
		return new GroupEntity({
			id, name, user, users, classId,
			last: last ? new DiscussionTransformer().fromJSON(last) : null,
			createdAt, updatedAt
		})
	}

	toJSON (entity: GroupEntity): GroupToModel {
		return {
			name: entity.name,
			classId: entity.classId
		}
	}
}
