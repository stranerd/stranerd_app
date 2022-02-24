import { ClassFromModel, ClassToModel } from '../models/class'
import { ClassEntity } from '../../domain/entities/class'

export class ChatTransformer {
	fromJSON (model: ClassFromModel) {
		const {      id, name,  
		              createdAt, userId, userBio, userRoles, 
		             users, updatedAt} = model
		return new ClassEntity({
			     id, name,  
		              createdAt, userId, userBio, userRoles, 
		             users, updatedAt
		})
	}

	toJSON (entity: ClassEntity): ClassToModel {
		return {
			name: entity.name,
		
		}
	}
}
