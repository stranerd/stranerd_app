import { BaseEntity, Media, parseMedia } from '@modules/core'
import {  generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'

export class DiscussionEntity extends BaseEntity {
	readonly id: string
	readonly from: string
	readonly content: string | null
	readonly media: Media | null
	readonly path: [string, string]
    readonly groupId: string | null
    public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({ id, from, content, media, path, groupId, userBio, userRoles, createdAt, updatedAt }: DiscussionConstructorArgs) {
		super()
		this.id = id
		this.from = from
		this.content = content
		this.media = media ? parseMedia(media) : null
		this.path = path
		this.groupId = groupId
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

	get to () {
		return this.path.find((id) => id !== this.from) ?? ''
	}
}

type DiscussionConstructorArgs = {
	id: string,
	from: string,
	path: [string, string],
	content: string | null,
	media: Media | null,
	createdAt: number
	updatedAt: number
	readAt: number | null
    groupId: string | null
    userBio: UserBio
	userRoles: UserRoles
}
