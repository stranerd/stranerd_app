import { BaseEntity, parseMedia } from '@modules/core'
import { capitalize, catchDivideByZero, formatNumber } from '@utils/commons'
import { getRankImage } from './rank'
import {
	EmbeddedUser,
	UserAccount,
	UserBio,
	UserDates,
	UserRank,
	UserRoles,
	UserSchoolData,
	UserSession,
	UserStatus
} from '../types'

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	session: UserSession
	dates: UserDates
	rank: UserRank
	nextRank: UserRank | null
	school: UserSchoolData | null
}

export const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const firstName = capitalize(bio?.firstName ?? 'Anon')
	const lastName = capitalize(bio?.lastName ?? 'Ymous')
	const fullName = capitalize(bio?.fullName ?? (firstName + ' ' + lastName))
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const photo = bio?.photo ? parseMedia(bio.photo) : null
	return { firstName, lastName, fullName, email, description, photo }
}

export const generateDefaultRoles = (roles: Partial<UserRoles>): UserRoles => ({
	isStranerdAdmin: roles?.isStranerdAdmin ?? false,
	isStranerdTutor: roles?.isStranerdTutor ?? false,
	isVerified: roles?.isVerified ?? false
})

export const generateEmbeddedUser = (user: EmbeddedUser): EmbeddedUser => ({
	...user,
	bio: generateDefaultBio(user.bio),
	roles: generateDefaultRoles(user.roles)
})

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly account: UserAccount
	public readonly status: UserStatus
	public readonly session: UserSession
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
		             session,
		             dates,
		             rank,
		             school,
		             nextRank
	             }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio)
		this.roles = generateDefaultRoles(roles)
		this.account = account
		this.status = status
		this.session = session
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

	get averageRating () {
		return catchDivideByZero(this.account.ratings.total, this.ratingCount)
	}

	get ratingCount () {
		return this.account.ratings.count
	}

	get orderRating () {
		return Math.pow(this.account.ratings.total, this.averageRating)
	}

	get score () {
		return this.account.score
	}

	get rankImage () {
		return getRankImage(this.rank.id)
	}

	get nextRankImage () {
		return this.nextRank ? getRankImage(this.nextRank.id) : null
	}

	get formattedScore () {
		return formatNumber(this.score, 2)
	}

	get currentSession () {
		return this.session.currentSessions[0] || this.session.currentTutorSessions[0] || null
	}

	get canHostSessions () {
		return !this.currentSession && this.isTutor && this.isOnline
	}

	get canRequestSessions () {
		return !this.currentSession &&
			this.session.requests.length === 0 &&
			this.session.lobby.length === 0 &&
			this.isOnline
	}

	get meta () {
		return this.account.meta
	}

	get nerdScoreMessage () {
		if (this.account.rankings.daily > 10) return 'Your performance has been excellent today. Keep it up.'
		if (this.account.rankings.daily > 5) return 'You are on a streak today. Keep it rolling!'
		if (this.account.rankings.daily > 2) return 'Keep doing what you are doing!'
		return 'Time to pick up on your performance.'
	}

	get isAdmin () {
		return this.roles.isStranerdAdmin
	}

	set isAdmin (isAdmin) {
		this.roles.isStranerdAdmin = isAdmin
	}

	get isTutor () {
		return this.roles.isStranerdTutor
	}

	set isTutor (isTutor) {
		this.roles.isStranerdTutor = isTutor
	}

	get isVerified () {
		return this.roles.isVerified
	}

	set isVerified (isVerified) {
		this.roles.isVerified = isVerified
	}
}

