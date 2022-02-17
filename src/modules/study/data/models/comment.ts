import { CommentData } from '../../domain/entities/comment'
import { UserBio, UserRoles } from '@modules/users'

export interface CommentFromModel extends Omit<CommentToModel, 'type'> {
	id: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	data: CommentData
}
