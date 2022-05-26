import { BaseEntity, Media, parseMedia } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly user: EmbeddedUser
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: Media | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             user,
		             isHosted,
		             link,
		             media,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.user = generateEmbeddedUser(user)
		this.isHosted = isHosted
		this.link = link
		this.media = media ? parseMedia(media) : null
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get fileName () {
		if (this.media) return this.media.name
		const trimQuery = (this.link ?? '').split('?')[0] ?? ''
		return trimQuery.split('/').pop() ?? this.title.replace(' ', '-').toLowerCase()
	}

	get fileLink () {
		return this.media?.link ?? this.link!
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}

	get shareLink () {
		return `/study/notes/${this.id}`
	}

	search (search: string) {
		return this.title.toLowerCase().includes(search.toLowerCase())
	}
}

type NoteConstructorArgs = {
	id: string,
	isHosted: boolean
	link: string | null
	media: Media | null
	user: EmbeddedUser
	title: string
	description: string
	createdAt: number
	updatedAt: number
}
