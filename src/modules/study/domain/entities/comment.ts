import { BaseEntity } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class CommentEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly data: CommentData
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             body,
		             data,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: CommentConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.data = data
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type CommentConstructorArgs = {
	id: string
	body: string
	data: CommentData
	userId: string
	userBio: UserBio
	userRoles: UserRoles
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
