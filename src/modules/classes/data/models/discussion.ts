import { Media } from '@modules/core'
import { UserBio, UserRoles } from '@modules/users'

export interface DiscussionFromModel extends DiscussionToModel {
	id: string
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}

export interface DiscussionToModel {
	content: string | null
	media: Media | null
	groupId: string
}
