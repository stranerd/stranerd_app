import { generateDefaultBio, UserBio } from '@modules/users'
import { BaseEntity, Media } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly tags: string[]
	public readonly attachments: Media[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, coins, questionId,
		             createdAt, userId, userBio, tags, attachments,
		             best, votes, commentsCount, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.coins = coins
		this.questionId = questionId
		this.userId = userId
		this.tags = tags
		this.attachments = attachments ?? []
		this.userBio = generateDefaultBio(userBio)
		this.best = best ?? false
		this.votes = votes
		this.commentsCount = commentsCount ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.fullName
	}

	get avatar () {
		return this.userBio.photo
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
		return this.best || this.commentsCount > 0
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
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	coins: number
	questionId: string
	tags: string[]
	attachments: Media[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}
