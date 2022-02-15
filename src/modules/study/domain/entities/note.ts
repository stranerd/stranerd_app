import { BaseEntity, Media } from '@modules/core'
import { generateDefaultBio, UserBio } from '@modules/users'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly description: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly isPublic: boolean
	public readonly isHosted: boolean
	public readonly link: string | null
	public readonly media: Media | null
	public readonly preview: Media
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             description,
		             tags,
		             userId,
		             userBio,
		             isPublic,
		             isHosted,
		             link,
		             media,
		             preview,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.description = description
		this.tags = tags
		this.userId = userId
		this.userBio = generateDefaultBio(userBio)
		this.isPublic = isPublic
		this.isHosted = isHosted
		this.link = link
		this.media = media
		this.preview = preview
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
}

type NoteConstructorArgs = {
	id: string,
	isPublic: boolean
	isHosted: boolean
	link: string | null
	media: Media | null
	preview: Media
	userId: string
	userBio: UserBio
	title: string
	description: string
	tags: string[]
	createdAt: number
	updatedAt: number
}
