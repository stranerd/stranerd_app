import { Media } from '@modules/core'
import { UserBio, UserRoles } from '@modules/users'

export interface DiscussionFromModel extends DiscussionToModel {
	id: string
	links: { original: string, normalized: string }[]
	createdAt: number
	updatedAt: number
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}

export interface DiscussionToModel {
	content: string
	media: Media | null
	groupId: string
}
