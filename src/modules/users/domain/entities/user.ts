import { BaseEntity } from '@modules/core'
import {
	CollegeType,
	UserAccount,
	UserBio,
	UserDates,
	UserRank,
	UserRoles,
	UserSchoolData,
	UserSchoolType,
	UserStatus
} from '../types'

type UserConstructorArgs = {
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

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly account: UserAccount
	public readonly status: UserStatus
	public readonly dates: UserDates
	public readonly rank: UserRank
	public readonly nextRank: UserRank | null
	public readonly school: UserSchoolData | null

	constructor ({
		             id,
		             bio,
		             roles,
		             account,
		             status,
		             dates,
		             rank,
		             school,
		             nextRank
	             }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = bio
		this.roles = roles
		this.account = account
		this.status = status
		this.dates = dates
		this.rank = rank
		this.nextRank = nextRank
		this.school = school
	}

	get isOnline () {
		return this.status.connections.length > 0
	}

	get lastSeen () {
		return this.isOnline ? Date.now() : this.status.lastUpdatedAt
	}

	get score () {
		return this.account.score
	}

	get meta () {
		return this.account.meta
	}

	get shareLink () {
		return `/users/${this.id}`
	}

	get firstInstitution () {
		if (!this.school) return null
		if (this.school?.type === UserSchoolType.college) return this.school.institutionId
		return this.school.exams.at(0)?.institutionId ?? null
	}

	isCollege (user: UserEntity): user is Omit<UserEntity, 'school'> & { school: CollegeType } {
		return user.school?.type === UserSchoolType.college
	}
}
