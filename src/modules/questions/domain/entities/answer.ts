import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly tagId: string
	public readonly attachments: Media[]
	public readonly user: EmbeddedUser
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, questionId, tagId,
		             createdAt, user, attachments,
		             best, votes, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.questionId = questionId
		this.tagId = tagId
		this.user = generateEmbeddedUser(user)
		this.attachments = attachments.map(parseMedia) ?? []
		this.best = best ?? false
		this.votes = votes
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get trimmedTitle () {
		return trimToLength(this.strippedTitle, 200)
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 200)
	}

	get strippedTitle () {
		return extractTextFromHTML(this.title)
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

	get upVotes () {
		return this.votes.filter((v) => v.vote === 1).length
	}

	get downVotes () {
		return this.votes.filter((v) => v.vote === -1).length
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	questionId: string
	tagId: string
	attachments: Media[]
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
}
