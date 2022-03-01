import { BaseEntity, Media, parseMedia } from '@modules/core'
import { generateDefaultBio, generateDefaultRoles, UserBio, UserRoles } from '@modules/users'
import { appName } from '@utils/environment'

export class VideoEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly isPublic: boolean
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             userId,
		             userBio,
		             userRoles,
		             isPublic,
		             isHosted,
		             link,
		             media,
		             createdAt,
		             updatedAt
	             }: VideoConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.userRoles = generateDefaultRoles(userRoles)
		this.isPublic = isPublic
		this.isHosted = isHosted
		this.link = link
		this.media = media ? parseMedia(media) : null
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.userRoles[appName].isVerified
	}
}

type VideoConstructorArgs = {
	id: string,
	isPublic: boolean
	isHosted: boolean
	link: string | null
	media: Media | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	title: string
	description: string
	createdAt: number
	updatedAt: number
}
