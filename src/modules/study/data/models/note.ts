import { EmbeddedUser } from '@modules/users'

export interface NoteFromModel extends NoteToModel {
	id: string
	links: { original: string, normalized: string }[]
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	title: string
	content: string
	isPrivate: boolean
}
