import { EmbeddedUser } from '@modules/users'

export interface CommentFromModel extends CommentToModel {
	id: string
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	answerId: string
}
