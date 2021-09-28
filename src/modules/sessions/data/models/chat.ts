import { Media } from '@modules/core'

export interface ChatFromModel extends ChatToModel {
	id: string
	from: string
	path: [string, string]
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string | null
	media: Media | null
	sessionId: string | null
	to: string
}
