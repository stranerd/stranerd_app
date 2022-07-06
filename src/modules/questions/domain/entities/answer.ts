import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { AnswerMeta } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly tagId: string
	public readonly attachments: Media[]
	public readonly user: EmbeddedUser
	public readonly meta: AnswerMeta
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, questionId, tagId,
		             createdAt, user, attachments, meta,
		             best, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.questionId = questionId
		this.tagId = tagId
		this.user = generateEmbeddedUser(user)
		this.attachments = attachments.map(parseMedia)
		this.best = best
		this.meta = meta
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 120)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isModified () {
		return this.best
	}

	get canBeEdited () {
		return !this.isModified
	}

	get canBeDeleted () {
		return !this.isModified
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type AnswerConstructorArgs = {
	id: string
	body: string
	questionId: string
	tagId: string
	attachments: Media[]
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	meta: AnswerMeta
}
