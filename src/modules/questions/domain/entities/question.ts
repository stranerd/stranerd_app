import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { appName } from '@utils/environment'

type QuestionConstructorArgs = {
	id: string
	body: string
	isAnswered: boolean
	data: QuestionData
	attachments: Media[]
	subject: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	createdAt: number
	updatedAt: number
}

export enum QuestionType {
	users = 'users',
	classes = 'classes'
}

type UserType = {
	type: QuestionType.users
}

type ClassType = {
	type: QuestionType.classes
	classId: string
}

export type QuestionData = UserType | ClassType

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly data: QuestionData
	public readonly attachments: Media[]
	public readonly subject: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly isAnswered: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, subject, isAnswered, data,
		             bestAnswers, createdAt, userId, userBio, userRoles, attachments,
		             answers, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.isAnswered = isAnswered
		this.data = data
		this.attachments = attachments.map(parseMedia) ?? []
		this.subject = subject
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.fullName!
	}

	get avatar () {
		return this.userBio.photo
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 80)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isModified () {
		return this.answers.length > 0
	}

	get canBeEdited () {
		return !this.isModified
	}

	get canBeDeleted () {
		return !this.isModified
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

