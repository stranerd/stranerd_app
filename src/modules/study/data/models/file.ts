import { EmbeddedUser } from '@modules/users'
import { Media } from '@modules/core'

export interface FileFromModel extends FileToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface FileToModel {
	title: string
	media: Media
}
