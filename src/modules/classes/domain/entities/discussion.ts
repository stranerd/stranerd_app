import { BaseEntity, Media, parseMedia } from '@modules/core'
import {  generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'

export class DiscussionEntity extends BaseEntity {
	readonly id: string
	readonly content: string | null
	readonly media: Media | null
    readonly groupId: string 
    public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	readonly createdAt: number
	readonly updatedAt: number

	constructor ({ id,  content, media,  groupId, userBio, userRoles, createdAt, updatedAt }: DiscussionConstructorArgs) {
		super()
		this.id = id
		this.content = content
		this.media = media ? parseMedia(media) : null
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


}

type DiscussionConstructorArgs = {
	id: string,
	content: string | null,
	media: Media | null,
	createdAt: number
	updatedAt: number
    groupId: string 
    userBio: UserBio
	userRoles: UserRoles
}
