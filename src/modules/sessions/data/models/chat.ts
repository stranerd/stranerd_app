import { Media } from '@modules/core'

export interface ChatFromModel extends ChatToModel {
	id: string
	from: string
	readAt: number | null,
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	content: string
	media: Media | null
	sessionId: string | null
	to: string
}
