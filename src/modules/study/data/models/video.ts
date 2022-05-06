import { Media } from '@modules/core'
import { EmbeddedUser } from '@modules/users'

export interface VideoFromModel extends VideoToModel {
	id: string,
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	title: string
	description: string
	isHosted: boolean
	link: string | null
	media: Media | null
}
