import { Media } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export interface NoteFromModel extends NoteToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	title: string
	description: string
	isHosted: boolean
	link: string | null
	media: Media | null
}
