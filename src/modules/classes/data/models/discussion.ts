import { Media } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export interface DiscussionFromModel extends DiscussionToModel {
	id: string
	links: { original: string, normalized: string }[]
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
	classId: string
	user: EmbeddedUser
}

export interface DiscussionToModel {
	content: string
	media: Media | null
	groupId: string
}
