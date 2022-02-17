import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { BaseEntity, Media, parseMedia } from '@modules/core'
import { extractTextFromHTML, trimToLength } from '@utils/commons'
import { appName } from '@utils/environment'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly attachments: Media[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, questionId,
		             createdAt, userId, userBio, userRoles, attachments,
		             best, votes, commentsCount, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.questionId = questionId
		this.userId = userId
		this.attachments = attachments.map(parseMedia) ?? []
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = userRoles
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

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	questionId: string
	attachments: Media[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}
