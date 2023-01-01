import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@stranerd/validate'
import { QuestionMeta } from '../types'

type QuestionConstructorArgs = {
	id: string
	body: string
	isAnswered: boolean
	attachments: Media[]
	tagId: string
	user: EmbeddedUser
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	meta: QuestionMeta
	isPrivate: boolean
	createdAt: number
	updatedAt: number
}

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly tagId: string
	public readonly user: EmbeddedUser
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly isAnswered: boolean
	public readonly meta: QuestionMeta
	public readonly isPrivate: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, tagId, isAnswered, isPrivate,
		             bestAnswers, createdAt, user, attachments,
		             meta, answers, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.isAnswered = isAnswered
		this.tagId = tagId
		this.attachments = attachments.map(parseMedia)
		this.user = generateEmbeddedUser(user)
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.meta = meta
		this.isPrivate = isPrivate
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get saveFilePath () {
		return `questions/questions/${this.id}`
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

	get shareLink () {
		return `/questions/${this.id}`
	}

	search (search: string) {
		return this.strippedBody.toLowerCase().includes(search.toLowerCase())
	}
}

