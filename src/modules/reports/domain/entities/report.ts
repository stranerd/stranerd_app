import { BaseEntity, Media, parseMedia } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'

export class ReportEntity extends BaseEntity {
	readonly id: string
	readonly data: ReportData
	readonly user: EmbeddedUser
	readonly reportedId: string
	readonly message: string
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
					 id,
					 data,
					 user,
					 reportedId,
					 message,
					 createdAt,
					 updatedAt
				 }: ReportConstructorArgs) {
		super()
		this.id = id
		if (data.type === ReportType.users) data.reported = generateEmbeddedUser(data.reported)
		else if (data.type === ReportType.questions || data.type === ReportType.answers) data.reported.user = generateEmbeddedUser(data.reported.user)
		if (data.type === ReportType.pastQuestions) data.reported.questionMedia = data.reported.questionMedia.map(parseMedia)
		this.data = data
		this.reportedId = reportedId
		this.user = generateEmbeddedUser(user)
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type ReportConstructorArgs = {
	id: string
	data: ReportData
	user: EmbeddedUser
	reportedId: string
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
	reported: EmbeddedUser
}

export type QuestionReportType = {
	type: ReportType.questions,
	reported: { body: string, user: EmbeddedUser }
}

export type AnswerReportType = {
	type: ReportType.answers,
	reported: { title: string, body: string, questionId: string, user: EmbeddedUser }
}

export type PastQuestionReportType = {
	type: ReportType.pastQuestions,
	reported: { question: string, questionMedia: Media[] }
}

export type ReportData = UserReportType | QuestionReportType | AnswerReportType | PastQuestionReportType
