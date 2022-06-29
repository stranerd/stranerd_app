import { Media } from '@modules/core'
import { ChatData } from '../../domain/types'
import { EmbeddedUser } from '@modules/users'

export interface ChatFromModel extends ChatToModel {
	id: string
	from: EmbeddedUser
	data: ChatData
	links: { original: string, normalized: string }[]
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}

export interface ChatToModel {
	to: string
	media: Media | null
	body: string
}
