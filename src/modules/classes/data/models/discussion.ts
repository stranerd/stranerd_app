import { UserBio, UserRoles } from '@modules/users'
import { Media } from '@modules/core'

export interface DiscussionFromModel extends DiscussionToModel {
	id: string,
	from: string,
	path: [string, string],
	content: string | null,
	media: Media | null,
	createdAt: number
	updatedAt: number
	readAt: number | null
    groupId: string | null
    userBio: UserBio
	userRoles: UserRoles
	

}

export interface DiscussionToModel {
	name: string
}
