import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, status, dates, nextRank, school, rank } = model
		return new UserEntity({
			id, bio, roles, account, status, dates, rank, nextRank, school
		})
	}

	toJSON (_: UserEntity): UserToModel {
		return {}
	}
}
