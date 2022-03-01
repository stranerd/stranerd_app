import { Media } from '@modules/core'
import { UserBio, UserRoles } from '@modules/users'

export interface VideoFromModel extends VideoToModel {
	id: string,
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	title: string
	description: string
	isPublic: boolean
	isHosted: boolean
	link: string | null
	media: Media | null
}
