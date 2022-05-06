import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { BaseEntity } from '@modules/core'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly answerId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             body,
		             createdAt,
		             user,
		             answerId,
		             updatedAt
	             }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.user = generateEmbeddedUser(user)
		this.answerId = answerId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	user: EmbeddedUser
	answerId: string
	createdAt: number
	updatedAt: number
}
