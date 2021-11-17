import { RankTypes } from './rank'

enum CountStreakBadges {
	NewQuestion = 'NewQuestion',
	NewAnswer = 'NewAnswer',
	NewTag = 'NewTag',
	NewAnswerComment = 'NewAnswerComment',
	NewAnswerVote = 'NewAnswerVote',
	GiveBestAnswer = 'GiveBestAnswer',
	GetBestAnswer = 'GetBestAnswer',
	AttendSession = 'AttendSession',
	HostSession = 'HostSession'
}

export interface BadgeData {
	streak: Record<CountStreakBadges, number[]>
	rank: RankTypes[]
}

export interface BadgeBadges {
	count: Record<CountStreakBadges, number[]>
	streak: Record<CountStreakBadges, number[]>
	rank: RankTypes[]
}

export interface BadgeAllBadges {
	rankBadges: { name: RankTypes, key: string, levelName: RankTypes, level: number }[]
	countBadges: { name: string, key: string, levelName: string, level: number }[]
	streakBadges: { name: string, key: string, levelName: string, level: number }[]
}

type BadgeConstructorArgs = {
	id: string
	userId: string
	data: BadgeData
	badges: BadgeBadges
	allBadges: BadgeAllBadges
	createdAt: number
	updatedAt: number
}

export class BadgeEntity {
	public readonly id: string
	public readonly userId: string
	public readonly data: BadgeData
	public readonly badges: BadgeBadges
	public readonly allBadges: BadgeAllBadges
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor (data: BadgeConstructorArgs) {
		this.id = data.id
		this.userId = data.userId
		this.data = data.data
		this.badges = data.badges
		this.allBadges = data.allBadges
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}
