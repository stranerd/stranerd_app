import { BaseEntity } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export class ReportEntity extends BaseEntity {
	readonly id: string
	readonly entity: ReportData
	readonly user: EmbeddedUser
	readonly message: string
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({
		             id,
		             entity,
		             user,
		             message,
		             createdAt,
		             updatedAt
	             }: ReportConstructorArgs) {
		super()
		this.id = id
		this.entity = entity
		this.user = user
		this.message = message
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReportConstructorArgs = {
	id: string
	entity: ReportData
	user: EmbeddedUser
	message: string
	createdAt: number
	updatedAt: number
}

export enum ReportType {
	questions = 'questions',
	answers = 'answers',
	users = 'users',
	pastQuestions = 'pastQuestions',
	flashCards = 'flashCards'
}

export type ReportData = { type: ReportType, id: string }
