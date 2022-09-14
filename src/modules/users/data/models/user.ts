import { UserAccount, UserBio, UserDates, UserRank, UserRoles, UserSchoolData, UserStatus } from '../../domain/types'

export interface UserFromModel extends UserToModel {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	dates: UserDates
	rank: UserRank
	nextRank: UserRank | null
	school: UserSchoolData | null
}

export type UserToModel = Record<string, unknown>
