import { GroupFromModel, GroupToModel } from '../models/group'
import { GroupEntity } from '../../domain/entities/group'

export class ChatTransformer {
	fromJSON (model: GroupFromModel) {
		const {id, name,  
		       createdAt, classId, 
		       updatedAt} = model
		return new GroupEntity({
		    id, name,  
		    createdAt, classId, 
		    updatedAt
		})
	}

	toJSON (entity: GroupEntity): GroupToModel {
		return {
			name: entity.name,
		
		}
	}
}
