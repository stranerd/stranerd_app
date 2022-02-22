import { Media } from '@modules/core'

export interface DiscussionFromModel extends DiscussionToModel {
	id: string
	from: string
	path: [string, string]
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface DiscussionToModel {
	content: string | null
	media: Media | null
	groupId: string | null
	to: string
}
