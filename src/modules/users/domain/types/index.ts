import { RankTypes } from '@modules/users/domain/entities/rank'
import { appName } from '@utils/environment'
import { Media } from '@modules/core'

export enum UserSchoolType {
	'secondary' = 'secondary',
	'aspirant' = 'aspirant',
	'college' = 'college'
}

type SecondaryType = {
	type: UserSchoolType.secondary
	exams: {
		institutionId: string
		courseIds: string[]
		startDate: number
		endDate: number
	}[]
}

type AspirantType = {
	type: UserSchoolType.aspirant
	exams: {
		institutionId: string
		courseIds: string[]
		startDate: number
		endDate: number
	}[]
}

type CollegeType = {
	type: UserSchoolType.college
	institutionId: string
	facultyId: string
	departmentId: string
}

export type UserSchoolData = SecondaryType | AspirantType | CollegeType

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
	coverPhoto: Media | null
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
		notes: number
		videos: number
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

export interface UserRank {
	id: RankTypes
	score: number
	level: number
}
