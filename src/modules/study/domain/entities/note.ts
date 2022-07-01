import { BaseEntity } from '@modules/core'
import { EmbeddedUser, generateEmbeddedUser } from '@modules/users'

export class NoteEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly content: string
	public readonly user: EmbeddedUser
	public readonly isPrivate: boolean
	public readonly links: { original: string, normalized: string }[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             content,
		             user,
		             isPrivate,
		             links,
		             createdAt,
		             updatedAt
	             }: NoteConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.content = content
		this.user = generateEmbeddedUser(user)
		this.isPrivate = isPrivate
		this.links = links
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isUserVerified () {
		return this.user.roles.isVerified
	}

	get shareLink () {
		return `/study/notes/${this.id}`
	}

	search (search: string) {
		return this.title.toLowerCase().includes(search.toLowerCase()) || this.content.toLowerCase().includes(search.toLowerCase())
	}
}

type NoteConstructorArgs = {
	id: string,
	isPrivate: boolean
	links: { original: string, normalized: string }[]
	user: EmbeddedUser
	title: string
	content: string
	createdAt: number
	updatedAt: number
}
