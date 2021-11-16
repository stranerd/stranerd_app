import { BaseEntity } from '@modules/core'
import { UserBio } from '@modules/users'

export class VideoCommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly videoId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, createdAt, userId, userBio, videoId, updatedAt }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.userId = userId
		this.videoId = videoId
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	userId: string
	videoId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}
