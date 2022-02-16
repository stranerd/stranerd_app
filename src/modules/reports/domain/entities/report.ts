import { BaseEntity, Media } from '@modules/core'
import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class ReportEntity extends BaseEntity {
	readonly id: string
	readonly data: ReportData
	readonly reporterId: string
	readonly reportedId: string
	readonly reporterBio: UserBio
	readonly reporterRoles: UserRoles
	readonly message: string
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             data,
		             reporterId,
		             reportedId,
		             reporterBio,
		             reporterRoles,
		             message,
		             createdAt,
		             updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.reportedId = reportedId
		this.reporterId = reporterId
		this.reporterBio = generateDefaultBio(reporterBio)
		this.reporterRoles = reporterRoles
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.reporterRoles[appName].isVerified
	}
}

type ReportConstructorArgs = {
	id: string
	data: ReportData
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reporterRoles: UserRoles
	message: string,
	createdAt: number
	updatedAt: number
}

export enum ReportType {
	questions = 'questions',
	answers = 'answers',
	users = 'users',
	pastQuestions = 'pastQuestions'
}

export type UserReportType = {
	type: ReportType.users,
	reported: { userBio: UserBio, userRoles: UserRoles, userId: string }
}

export type QuestionReportType = {
	type: ReportType.questions,
	reported: { body: string, userId: string }
}

export type AnswerReportType = {
	type: ReportType.answers,
	reported: { title: string, body: string, questionId: string, userId: string }
}

export type PastQuestionReportType = {
	type: ReportType.pastQuestions,
	reported: { question: string, questionMedia: Media[] }
}

export type ReportData = UserReportType | QuestionReportType | AnswerReportType | PastQuestionReportType
