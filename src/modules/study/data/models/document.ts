import { Media } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export interface DocumentFromModel extends DocumentToModel {
	id: string
	links: { original: string, normalized: string }[]
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface DocumentToModel {
	title: string
	content: string
	isPrivate: boolean
	media: Media | null
}
