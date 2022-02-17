import { generateDefaultBio, UserBio, UserRoles } from '@modules/users'
import { BaseEntity } from '@modules/core'
import { appName } from '@utils/environment'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId?: string
	public readonly questionId?: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             body,
		             createdAt,
		             userId,
		             userBio,
		             userRoles,
		             answerId,
		             questionId,
		             updatedAt
	             }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.answerId = answerId
		this.questionId = questionId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = userRoles
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get userName () {
		return this.userBio.fullName
	}

	get avatar () {
		return this.userBio.photo
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	answerId?: string
	questionId?: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}
