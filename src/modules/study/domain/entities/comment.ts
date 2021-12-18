import { BaseEntity } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly data: CommentData
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             body,
		             data,
		             userId,
		             userBio,
		             createdAt,
		             updatedAt
	             }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.data = data
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	data: CommentData
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export enum CommentType {
	video = 'video'
}

type VideoType = {
	type: CommentType.video
	videoId: string
}

export type CommentData = VideoType
