import { BaseEntity, Media } from '@modules/core'
import { appName } from '@utils/environment'
import { capitalize, catchDivideByZero, formatNumber, getPercentage } from '@utils/commons'
import { getRankImage, RankTypes } from './rank'

export enum RankingTimes {
	daily = 'daily',
	weekly = 'weekly',
	monthly = 'monthly',
	overall = 'overall'
}

export interface UserBio {
	firstName: string
	lastName: string
	fullName: string
	email: string
	description: string
	photo: Media | null
}

export interface UserRoles {
	[appName]: {
		isAdmin: boolean
		isTutor: boolean
		isVerified: boolean
	}
}

export interface UserAccount {
	score: number
	meta: {
		questions: number
		answers: number
		bestAnswers: number
		answerComments: number
		sessions: number
		tutorSessions: number
		flashCards: number
		sets: number
	}
	streak: {
		count: number
		longestStreak: number
		lastEvaluatedAt: number
	}
	ratings: {
		total: number
		count: number
	}
	referrals: Record<string, boolean>
	rankings: Record<RankingTimes, number>
}

export interface UserStatus {
	connections: string[]
	lastUpdatedAt: number
}

export interface UserSession {
	currentSessions: string[]
	currentTutorSessions: string[]
	requests: string[]
	lobby: string[]
}

export interface UserDates {
	createdAt: number
	deletedAt: number | null
}

export interface UserTutor {
	strongestSubject: string | null
	weakerSubjects: string[]
}

export interface UserRank {
	id: RankTypes
	score: number
	level: number
}

type UserConstructorArgs = {
	id: string
	bio: UserBio
	roles: UserRoles
	account: UserAccount
	status: UserStatus
	tutor: UserTutor
	session: UserSession
	dates: UserDates
	rank: UserRank
	nextRank: UserRank | null
}

export const generateDefaultBio = (bio: Partial<UserBio>): UserBio => {
	const firstName = capitalize(bio?.firstName ?? 'Anon')
	const lastName = capitalize(bio?.lastName ?? 'Ymous')
	const fullName = firstName + ' ' + lastName
	const email = bio?.email ?? 'anon@ymous.com'
	const description = bio?.description ?? ''
	const photo = bio?.photo ?? null
	return { firstName, lastName, fullName, email, description, photo }
}

export class UserEntity extends BaseEntity {
	public readonly id: string
	public readonly bio: UserBio
	public readonly roles: UserRoles
	public readonly account: UserAccount
	public readonly status: UserStatus
	public readonly tutor: UserTutor
	public readonly session: UserSession
	public readonly dates: UserDates
	public readonly rank: UserRank
	public readonly nextRank: UserRank | null

	constructor ({
		             id,
		             bio,
		             roles,
		             account,
		             status,
		             tutor,
		             session,
		             dates,
		             rank,
		             nextRank
	             }: UserConstructorArgs) {
		super()
		this.id = id
		this.bio = generateDefaultBio(bio)
		this.roles = {
			[appName]: {
				isAdmin: roles[appName]?.isAdmin ?? false,
				isTutor: roles[appName]?.isTutor ?? false,
				isVerified: roles[appName]?.isVerified ?? false
			}
		}
		this.account = account
		this.status = status
		this.tutor = tutor
		this.session = session
		this.dates = dates
		this.rank = rank
		this.nextRank = nextRank
	}

	get firstName () {
		return this.bio.firstName
	}

	get lastName () {
		return this.bio.lastName
	}

	get fullName () {
		return this.bio.fullName!
	}

	get email () {
		return this.bio.email
	}

	get avatar () {
		return this.bio.photo
	}

	get description () {
		return this.bio.description
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

	get strongestSubject () {
		return this.tutor.strongestSubject
	}

	get weakerSubjects () {
		return this.tutor.weakerSubjects
	}

	get subjects () {
		const subjects = [...this.tutor.weakerSubjects]
		if (this.tutor.strongestSubject) subjects.push(this.tutor.strongestSubject)
		return subjects
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
}

