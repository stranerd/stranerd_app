import { Media } from '@modules/core'
import { UserBio } from '@modules/users'

export interface VideoFromModel extends VideoToModel {
	id: string,
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	title: string
	description: string
	tags: string[]
	isHosted: boolean
	link: string | null
	media: Media | null
}
