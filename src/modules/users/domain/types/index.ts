import { RankTypes } from '../entities/rank'
import { Media } from '@modules/core'
import { Phone } from '@modules/auth'

export * from './notifications'

export enum UserSchoolType {
	'aspirant' = 'aspirant',
	'college' = 'college'
}

export type AspirantType = {
	type: UserSchoolType.aspirant
	exams: {
		institutionId: string
		courseIds: string[]
		startDate: number
		endDate: number
	}[]
}

export type CollegeType = {
	type: UserSchoolType.college
	institutionId: string
	facultyId: string
	departmentId: string
}

export type UserSchoolData = AspirantType | CollegeType

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
	phone: Phone | null
}

export interface UserRoles {
	isStranerdAdmin: boolean
	isStranerdTutor: boolean
}

export type EmbeddedUser = {
	id: string
	bio: UserBio
	roles: UserRoles
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
		notes: number
		connects: number
	}
	streak: {
		count: number
		longestStreak: number
		lastEvaluatedAt: number
	}
	rankings: Record<RankingTimes, number>
}

export interface UserStatus {
	connections: string[]
	lastUpdatedAt: number
}

export interface UserDates {
	createdAt: number
	deletedAt: number | null
}

export interface UserRank {
	id: RankTypes
	score: number
	level: number
}
