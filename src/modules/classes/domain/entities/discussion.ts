import { BaseEntity, Media, parseMedia } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'

export class DiscussionEntity extends BaseEntity {
	public readonly id: string
	public readonly content: string
	public readonly media: Media | null
	public readonly links: string[]
	public readonly groupId: string
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             content,
		             media,
		             links,
		             groupId,
		             classId,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: DiscussionConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media ? parseMedia(media) : null
		this.links = links
		this.groupId = groupId
		this.classId = classId
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isMedia () {
		return !!this.media
	}

	get isImage () {
		return this.isMedia && this.media?.type.startsWith('image/')
	}
}

type DiscussionConstructorArgs = {
	id: string
	content: string
	media: Media | null
	links: string[]
	createdAt: number
	updatedAt: number
	groupId: string
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}
