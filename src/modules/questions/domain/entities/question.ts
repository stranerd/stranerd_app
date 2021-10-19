import { generateDefaultBio, UserBio } from '@modules/users'
import { BaseEntity, Media } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly attachments: Media[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly commentsCount: number
	public readonly creditable: number
	public readonly isAnswered: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, coins, subjectId, creditable, isAnswered,
		             bestAnswers, createdAt, userId, userBio, attachments,
		             answers, commentsCount, tags, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.creditable = creditable
		this.isAnswered = isAnswered
		this.tags = tags
		this.attachments = attachments ?? []
		this.subjectId = subjectId
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
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
		return trimToLength(this.strippedBody, 100)
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
}

type QuestionConstructorArgs = {
	id: string
	body: string
	coins: number
	creditable: number
	isAnswered: boolean
	tags: string[]
	attachments: Media[]
	subjectId: string
	userId: string
	userBio: UserBio
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}
