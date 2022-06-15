import { CommentMeta, InteractionEntity } from '../../domain/types'
import { EmbeddedUser } from '@modules/users'

export interface CommentFromModel extends CommentToModel {
	id: string
	user: EmbeddedUser
	meta: CommentMeta
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	entity: InteractionEntity
}
