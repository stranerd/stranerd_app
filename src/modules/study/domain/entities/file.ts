import { BaseEntity, Media, parseMedia } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'
import { isImage, isVideo } from '@stranerd/validate'

export class FileEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly media: Media
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             media,
		             user,
		             createdAt,
		             updatedAt
	             }: FileConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.media = parseMedia(media)
		this.user = generateEmbeddedUser(user)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}

	get shareLink () {
		return `/study/files/${this.id}`
	}

	get saveFilePath () {
		return `study/files/${this.id}`
	}

	get isImage () {
		return isImage(this.media).valid
	}

	get isVideo () {
		return isVideo(this.media).valid
	}

	get isDoc () {
		return !this.isImage && !this.isVideo
	}

}

type FileConstructorArgs = {
	id: string,
	user: EmbeddedUser
	title: string
	media: Media
	createdAt: number
	updatedAt: number
}
