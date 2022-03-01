import { Media } from '@modules/core'
import { UserBio, UserRoles } from '@modules/users'

export interface NoteFromModel extends NoteToModel {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface NoteToModel {
	title: string
	description: string
	isPublic: boolean
	isHosted: boolean
	link: string | null
	media: Media | null
}
