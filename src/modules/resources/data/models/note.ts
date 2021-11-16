import { Media } from '@modules/core'
import { UserBio } from '@modules/users'

export interface NoteFromModel extends NoteToModel {
	id: string
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	title: string
	description: string
	tags: string[]
	isHosted: boolean
	link: string | null
	media: Media | null
}
