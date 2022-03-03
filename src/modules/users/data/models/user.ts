import {
	UserAccount,
	UserBio,
	UserDates,
	UserRank,
	UserRoles,
	UserSession,
	UserStatus
} from '../../domain/entities/user'

export interface UserFromModel extends UserToModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	session: UserSession
	dates: UserDates
	rank: UserRank
	nextRank: UserRank | null
}

export type UserToModel = {}
