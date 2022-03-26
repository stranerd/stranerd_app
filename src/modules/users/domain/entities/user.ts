import { BaseEntity, parseMedia } from '@modules/core'
import { appName } from '@utils/environment'
import { capitalize, catchDivideByZero, formatNumber, getPercentage } from '@utils/commons'
import { getRankImage } from './rank'
import {
	UserAccount,
	UserBio,
	UserDates,
	UserRank,
	UserRoles,
	UserSchoolData,
	UserSchoolType,
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
	const fullName = firstName + ' ' + lastName
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const photo = bio?.photo ? parseMedia(bio.photo) : null
	const coverPhoto = bio?.coverPhoto ? parseMedia(bio.coverPhoto) : null
	return { firstName, lastName, fullName, email, description, photo, coverPhoto }
}

export const generateDefaultRoles = (roles: Partial<UserRoles>): UserRoles => ({
	[appName]: {
		isAdmin: roles?.[appName]?.isAdmin ?? false,
		isTutor: roles?.[appName]?.isTutor ?? false,
		isVerified: roles?.[appName]?.isVerified ?? false
	}
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

	get expectedScore () {
		return this.nextRank ? this.rank.score : this.account.score
	}

	get scorePercentage () {
		return getPercentage(this.score, this.expectedScore)
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

	get nerdScoreColor () {
		if (this.scorePercentage > 75) return { fg: '#00D246', bg: '#00D24622' }
		if (this.scorePercentage > 40) return { fg: '#546DD3', bg: '#546DD322' }
		return { fg: '#FF6666', bg: '#FF666622' }
	}

	get isAdmin () {
		return this.roles[appName].isAdmin
	}

	set isAdmin (isAdmin) {
		this.roles[appName].isAdmin = isAdmin
	}

	get isTutor () {
		return this.roles[appName].isTutor
	}

	set isTutor (isTutor) {
		this.roles[appName].isTutor = isTutor
	}

	get isVerified () {
		return this.roles[appName].isVerified
	}

	set isVerified (isVerified) {
		this.roles[appName].isVerified = isVerified
	}

	get isAspirant () {
		return [UserSchoolType.aspirant, UserSchoolType.secondary].includes(this.school?.type!)
	}
}

