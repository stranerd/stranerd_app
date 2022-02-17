import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { appName } from '@utils/environment'

type QuestionConstructorArgs = {
	id: string
	body: string
	isAnswered: boolean
	tags: string[]
	attachments: Media[]
	subjectId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly tags: string[]
	public readonly attachments: Media[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly commentsCount: number
	public readonly isAnswered: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, subjectId, isAnswered,
		             bestAnswers, createdAt, userId, userBio, userRoles, attachments,
		             answers, commentsCount, tags, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.isAnswered = isAnswered
		this.tags = tags
		this.attachments = attachments.map(parseMedia) ?? []
		this.subjectId = subjectId
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = userRoles
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.commentsCount = commentsCount ?? 0
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
		return this.commentsCount > 0 || this.answers.length > 0
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

