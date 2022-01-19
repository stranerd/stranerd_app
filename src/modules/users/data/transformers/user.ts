import { UserFromModel, UserToModel } from '../models/user'
import { UserEntity } from '../../domain/entities/user'

export class UserTransformer {
	fromJSON (model: UserFromModel) {
		const { id, bio, roles, account, status, tutor, session, dates, nextRank, rank } = model
		return new UserEntity({
			id, bio, roles, account, status, tutor, session, dates, rank, nextRank
		})
	}

	toJSON (_: UserEntity): UserToModel {
		return {}
	}
}
