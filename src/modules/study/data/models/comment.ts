import { CommentData } from '../../domain/entities/comment'
import { UserBio } from '@modules/users'

export interface CommentFromModel extends Omit<CommentToModel, 'type'> {
	id: string
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	data: CommentData
}
