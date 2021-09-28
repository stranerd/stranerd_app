import {
	UserAccount,
	UserBio,
	UserDates,
	UserRank,
	UserRoles,
	UserSession,
	UserStatus,
	UserTutor
} from '../../domain/entities/user'

export interface UserFromModel extends UserToModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor: UserTutor
	session: UserSession
	dates: UserDates
	rankProgress: number
	rank: UserRank
	nextRank: UserRank | null
}

export interface UserToModel {
}
