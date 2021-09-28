import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export type Type = {
	type: ReportType,
	reported: Record<string, any>
}

export class ReportEntity<T extends Type> extends BaseEntity {
	readonly id: string
	readonly type: T['type']
	readonly reporterId: string
	readonly reportedId: string
	readonly reporterBio: UserBio
	readonly reported: T['reported']
	readonly message: string
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             type,
		             reporterId,
		             reportedId,
		             reporterBio,
		             reported,
		             message,
		             createdAt,
		             updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.type = type
		this.reportedId = reportedId
		this.reporterId = reporterId
		this.reporterBio = generateDefaultBio(reporterBio)
		// @ts-ignore
		this.reported = type === ReportType.users ? generateDefaultBio(reported) : reported
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReportConstructorArgs = {
	id: string
	type: ReportType
	reporterId: string
	reportedId: string
	reporterBio: UserBio
	reported: Record<string, any>
	message: string,
	createdAt: number
	updatedAt: number
}

export enum ReportType {
	questions = 'questions',
	answers = 'answers',
	users = 'users'
}

export class UserReportEntity extends ReportEntity<UserReportType> {
}

export class QuestionReportEntity extends ReportEntity<QuestionReportType> {
}

export class AnswerReportEntity extends ReportEntity<AnswerReportType> {
}

export type UserReportType = {
	type: ReportType.users,
	reported: { bio: UserBio, userId: string }
}

export type QuestionReportType = {
	type: ReportType.questions,
	reported: { body: string, userId: string }
}

export type AnswerReportType = {
	type: ReportType.answers,
	reported: { title: string, body: string, questionId: string, userId: string }
}
